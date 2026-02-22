import { Controller } from "react-hook-form";
import TagsInput from "react-tagsinput";

const TagsInputComponent = ({ control, label, errors, className, name }) => {
  return (
    <div className={`flex flex-col justify-start gap-y-1 mb-3 ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={name} className="text-sm font-semibold">
          {label}
        </label>
        {errors && (
          <span className="text-xs text-error">
            {errors[name]?.message && errors[name]?.message}
          </span>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TagsInput
            name={name}
            value={field.value || []}
            onChange={field.onChange}
            onlyUnique
            className="bg-transparent pt-1 pb-0.5 px-0.5 flex items-center outline-none rounded-lg border border-tertiary"
            focusedClassName="border-tertiary"
            inputProps={{
              placeholder: "تگ مورد نظر را بنویسید و enter بزنید",
              className:
                "outline-none border-none text-txt-primary px-2 py-2 w-[150%]",
            }}
            tagProps={{
              className:
                "bg-secondary text-primary rounded-sm text-sm font-medium inline-flex items-center gap-x-1 mx-1 p-1",
              classNameRemove: "react-tagsinput-remove text-error",
            }}
          />
        )}
      />
    </div>
  );
};

export default TagsInputComponent;
