"use client";
import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";
import Btn from "@/common/Btn";
import { FiPaperclip } from "react-icons/fi";

const ResumeUploader = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const handleFileUpload = useCallback(async (file) => {
    if (!file) return;

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadCompleted(false);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setUploadCompleted(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    },
    onDropRejected: (rejectedFiles) => {
      const file = rejectedFiles[0];
      if (file.errors[0].code === "file-too-large") {
        alert("حجم فایل نباید بیشتر از ۵ مگابایت باشد!");
      } else if (file.errors[0].code === "file-invalid-type") {
        alert("فقط فایل‌های PDF, Word و Text مجاز هستند!");
      }
    },
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setUploadCompleted(false);
    setIsUploading(false);
  };

  return (
    <div className="w-full mx-auto">
      {/* drag & drop zone */}
      {!uploadedFile && !isUploading && !uploadCompleted && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed bg-bg-primary rounded-xl p-8 text-center cursor-pointer transition-all duration-300
            ${
              isDragActive
                ? "border-success scale-105"
                : "border-secondary hover:border-blue-400"
            }
          `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">{isDragActive ? "📂" : "📄"}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isDragActive ? "رها کنید..." : "لطفا رزومه خود را آپلود کنید"}
            </h3>
            <p className="text-sm text-gray-600">
              فایل را به اینجا بکشید یا با کلیک کردن انتخاب کنید
            </p>
            <p className="text-xs text-gray-500">
              فرمت‌های مجاز: PDF, Word, Text • حداکثر حجم: ۵MB
            </p>
            <Btn
              text="انتخاب فایل"
              type="button"
              onClick={open}
              color="secondary"
            />
          </div>
        </div>
      )}

      {/* progress  */}
      {uploadedFile && !uploadCompleted && (
        <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-2xl">
                <FiPaperclip />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-txt-primary truncate">
                  {uploadedFile.name}
                </div>
                <div className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)}
                </div>
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="w-full bg-transparent rounded-full h-2">
                <div
                  className="bg-secondary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <div className="text-center text-sm text-primary font-semibold">
                {uploadProgress}% - در حال آپلود...
              </div>
            </div>
          )}
        </div>
      )}

      {/* success message */}
      {uploadCompleted && (
        <div className="p-6 border border-success rounded-lg text-center">
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            رزومه با موفقیت آپلود شد!
          </h3>
          <p className="text-sm text-green-600 mb-4">
            فایل: {uploadedFile?.name}
          </p>
          <div className="flex gap-3 justify-center">
            <Btn
              text="دانلود رزومه"
              type="button"
              color="primary"
              onClick={() => {
                // کد برای دانلود فایل
                const url = URL.createObjectURL(uploadedFile);
                const a = document.createElement("a");
                a.href = url;
                a.download = uploadedFile.name;
                a.click();
                URL.revokeObjectURL(url);
              }}
            />
            <Btn
              text="آپلود رزومه جدید"
              type="button"
              color="secondary"
              onClick={handleRemoveFile}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
