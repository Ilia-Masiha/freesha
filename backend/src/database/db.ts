import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq, sql } from "drizzle-orm";
import { Pool } from "pg";

import {
  gendersTable,
  languagesTable,
  rolesTable,
  userEducationDegreesTable,
  userLanguagesTable,
  userSkillsTable,
  usersTable,
  userWorkExperiencesTable,
} from "./schema.js";
import { customLog, isNone } from "../helpers/utils.js";
import {
  DbError,
  DbResponse,
  DbResult,
  EducationDegree,
  None,
  PreRegisterInfo,
  Transaction,
  User,
  WorkExperience,
} from "../helpers/types.js";

export let db: NodePgDatabase<Record<string, never>> & {
  $client: Pool;
};

export function connectDb() {
  db = drizzle(process.env.DATABASE_URL!);

  customLog("database", "Connected via drizzle");
}

export async function disconnectDb() {
  await db.$client.end();

  customLog("database", "Connection closed");
}

function makeDbResponse<T>(result: T, error: DbError): DbResponse<T> {
  return { result, error };
}

export async function emailExists(
  email: string
): Promise<DbResponse<DbResult>> {
  try {
    const result = await db
      .select({
        email: usersTable.id,
      })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    return makeDbResponse(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function insertUser(
  preRegisterInfo: PreRegisterInfo
): Promise<DbResponse<DbResult>> {
  try {
    const result = await db
      .insert(usersTable)
      .values({
        name: preRegisterInfo.name,
        email: preRegisterInfo.email,
        password: preRegisterInfo.hashedPassword,
        roleId: 1,
      })
      .returning({
        id: usersTable.id,
      });

    return makeDbResponse(result[0]?.id, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getUser(id: number): Promise<DbResponse<User | None>> {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        roleName: rolesTable.roleName,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
      .where(eq(usersTable.id, id));

    return makeDbResponse<User | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function getUserByEmail(
  email: string
): Promise<DbResponse<User | None>> {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        hashedPassword: usersTable.password,
        roleName: rolesTable.roleName,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
        lastLoginAt: usersTable.lastLoginAt,
      })
      .from(usersTable)
      .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
      .where(eq(usersTable.email, email));

    return makeDbResponse<User | None>(result[0], null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function updateLastLogin(
  id: number
): Promise<DbResponse<true | null>> {
  try {
    await db
      .update(usersTable)
      .set({
        lastLoginAt: sql`NOW()`,
      })
      .where(eq(usersTable.id, id));

    return makeDbResponse(true, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

export async function updateUser(
  id: number,
  values: Partial<User>
): Promise<DbResponse<Partial<User> | None>> {
  try {
    const { skills, languageCodes } = values;
    let { educationDegrees, workExperiences } = values;

    delete values.skills;
    delete values.languageCodes;
    delete values.educationDegrees;
    delete values.workExperiences;

    educationDegrees = educationDegrees?.map(
      (value) => ((value.userId = id), value)
    );
    workExperiences = workExperiences?.map(
      (value) => ((value.userId = id), value)
    );

    const result = await db.transaction(async (tx: Transaction) => {
      await tx
        .update(usersTable)
        .set({ ...values, updatedAt: sql`NOW()` })
        .where(eq(usersTable.id, id));

      await insertSkills(tx, id, skills);
      await insertLanguages(tx, id, languageCodes);
      await insertEducationDegrees(
        tx,
        id,
        educationDegrees as Required<EducationDegree>[]
      );
      await insertWorkExperiences(
        tx,
        id,
        workExperiences as Required<WorkExperience>[]
      );

      const user = await tx
        .select({
          id: usersTable.id,
          name: usersTable.name,
          email: usersTable.email,
          roleName: rolesTable.roleName,

          skills: sql<string[]>`(
      SELECT ARRAY_AGG(DISTINCT ${userSkillsTable.skill})
      FROM ${userSkillsTable}
      WHERE ${userSkillsTable.userId} = ${usersTable.id}
    )`,
          languages: sql<string[]>`(
      SELECT ARRAY_AGG(DISTINCT ${languagesTable.languageNameFa})
      FROM ${userLanguagesTable}
      INNER JOIN ${languagesTable} ON ${userLanguagesTable.languageCode} = ${languagesTable.code}
      WHERE ${userLanguagesTable.userId} = ${usersTable.id}
    )`,

          educationDegrees: sql<Omit<EducationDegree, "userId">[]>`(
      SELECT COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'title', "title", 
            'startDate', "start_date",
            'endDate', "end_date"
          )
        ),
        '[]'::json
      )
      FROM ${userEducationDegreesTable}
      WHERE ${userEducationDegreesTable.userId} = ${usersTable.id}
    )`,
          workExperiences: sql<Omit<WorkExperience, "userId">[]>`(
      SELECT COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'jobTitle', "job_title", 
            'company', "company", 
            'startDate', "start_date",
            'endDate', "end_date"
          )
        ),
        '[]'::json
      )
      FROM ${userWorkExperiencesTable}
      WHERE ${userWorkExperiencesTable.userId} = ${usersTable.id}
    )`,

          postalCode: usersTable.postalCode,
          homeAddress: usersTable.homeAddress,
          genderName: gendersTable.genderName,
          jobTitle: usersTable.jobTitle,
          bio: usersTable.bio,
          birthDate: usersTable.birthDate,
          createdAt: usersTable.createdAt,
          updatedAt: usersTable.updatedAt,
        })
        .from(usersTable)
        .innerJoin(rolesTable, eq(usersTable.roleId, rolesTable.id))
        .innerJoin(gendersTable, eq(usersTable.genderId, gendersTable.id))
        .where(eq(usersTable.id, id));

      return user[0];
    });

    return makeDbResponse(result, null);
  } catch (error) {
    return makeDbResponse(null, error as Error);
  }
}

async function insertSkills(
  tx: Transaction,
  id: number,
  skills: string[] | None
): Promise<void> {
  if (isNone(skills)) {
    return;
  }

  const skillsObjects = [];
  for (const skill of skills) {
    skillsObjects.push({ userId: id, skill: skill });
  }

  await tx.delete(userSkillsTable).where(eq(userSkillsTable.userId, id));

  if (skills.length === 0) {
    return;
  }

  await tx.insert(userSkillsTable).values(skillsObjects);
}

async function insertLanguages(
  tx: Transaction,
  id: number,
  languageCodes: string[] | None
): Promise<void> {
  if (isNone(languageCodes)) {
    return;
  }

  const userLanguages = [];
  for (const languageCode of languageCodes) {
    userLanguages.push({ userId: id, languageCode: languageCode });
  }

  await tx.delete(userLanguagesTable).where(eq(userLanguagesTable.userId, id));

  if (languageCodes.length === 0) {
    return;
  }

  await tx.insert(userLanguagesTable).values(userLanguages);
}

async function insertEducationDegrees(
  tx: Transaction,
  id: number,
  educationDegrees: Required<EducationDegree>[] | None
): Promise<void> {
  if (isNone(educationDegrees)) {
    return;
  }

  await tx
    .delete(userEducationDegreesTable)
    .where(eq(userEducationDegreesTable.userId, id));

  if (educationDegrees.length === 0) {
    return;
  }

  await tx.insert(userEducationDegreesTable).values(educationDegrees);
}

async function insertWorkExperiences(
  tx: Transaction,
  id: number,
  workExperiences: Required<WorkExperience>[] | None
): Promise<void> {
  if (isNone(workExperiences)) {
    return;
  }

  await tx
    .delete(userWorkExperiencesTable)
    .where(eq(userWorkExperiencesTable.userId, id));

  if (workExperiences.length === 0) {
    return;
  }

  await tx.insert(userWorkExperiencesTable).values(workExperiences);
}
