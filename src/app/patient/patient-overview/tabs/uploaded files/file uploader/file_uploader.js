"use client";
import React, { useState } from "react";
import UploadList from "../upload lists/upload list";

const FileUploader = ({ id }) => {
  const [SelectedFile, setSelectedFile] = useState(null);

  const OnFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const OnFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const OnDragOver = (e) => {
    e.preventDefault();
  };

  const OnRemoveFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById(id);
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div
        className="p-8 border-dashed border-2 border-primary rounded-md text-center"
        onDrop={OnFileDrop}
        onDragOver={OnDragOver}
      >
        <input
          type="file"
          id={id}
          accept=".jpg, .jpeg, .png, .pdf"
          className="hidden"
          onChange={OnFileSelect}
        />
        <label htmlFor={id} className="cursor-pointer">
          <div className="mb-4 flex justify-center items-center">
            <svg
              width="139"
              height="139"
              viewBox="0 0 139 139"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="69.6745" cy="69.7409" r="69.1472" fill="#F3F4F8" />
              <path
                d="M86.3739 52.0677C85.4773 48.4839 83.4092 45.3023 80.4978 43.0282C77.5864 40.7541 73.9988 39.5178 70.3045 39.5156C66.6102 39.5135 63.0211 40.7456 60.1071 43.0163C57.1931 45.2871 55.1212 48.4662 54.2205 52.049C49.9717 52.4478 46.0399 54.4679 43.2416 57.6898C40.4434 60.9117 38.9938 65.0878 39.1941 69.3505C39.3943 73.6132 41.229 77.635 44.317 80.5804C47.4049 83.5258 51.5089 85.1684 55.7763 85.1671H61.9995C62.5497 85.1671 63.0773 84.9485 63.4664 84.5595C63.8554 84.1705 64.0739 83.6428 64.0739 83.0927C64.0739 82.5425 63.8554 82.0149 63.4664 81.6258C63.0773 81.2368 62.5497 81.0182 61.9995 81.0182H55.7763C54.1418 81.023 52.5224 80.7058 51.0105 80.0847C49.4986 79.4636 48.1238 78.5508 46.9647 77.3984C44.6237 75.0711 43.3031 71.9091 43.2935 68.6081C43.2839 65.307 44.586 62.1374 46.9133 59.7964C49.2407 57.4554 52.4027 56.1349 55.7037 56.1253C56.236 56.1653 56.7641 56.0063 57.1858 55.6789C57.6074 55.3516 57.8924 54.8793 57.9855 54.3537C58.4079 51.3916 59.8848 48.6813 62.145 46.7206C64.4051 44.7598 67.2968 43.6804 70.2889 43.6804C73.281 43.6804 76.1727 44.7598 78.4328 46.7206C80.6929 48.6813 82.1698 51.3916 82.5922 54.3537C82.7008 54.8611 82.982 55.315 83.3879 55.6381C83.7939 55.9612 84.2993 56.1334 84.8181 56.1253C88.1191 56.1253 91.2849 57.4366 93.6191 59.7708C95.9533 62.1049 97.2646 65.2707 97.2646 68.5718C97.2646 71.8728 95.9533 75.0386 93.6191 77.3728C91.2849 79.7069 88.1191 81.0182 84.8181 81.0182H78.5948C78.0447 81.0182 77.517 81.2368 77.128 81.6258C76.739 82.0149 76.5204 82.5425 76.5204 83.0927C76.5204 83.6428 76.739 84.1705 77.128 84.5595C77.517 84.9485 78.0447 85.1671 78.5948 85.1671H84.8181C89.0543 85.1227 93.1132 83.46 96.163 80.5195C99.2127 77.5791 101.023 73.5836 101.221 69.3519C101.42 65.1201 99.9933 60.9725 97.2328 57.7589C94.4723 54.5454 90.5873 52.5092 86.3739 52.0677Z"
                fill="#1E7BAE"
              />
              <path
                d="M79.1897 68.108C79.581 68.4858 80.105 68.6949 80.6489 68.6902C81.1928 68.6855 81.7131 68.4673 82.0977 68.0827C82.4823 67.6981 82.7005 67.1778 82.7052 66.6339C82.7099 66.09 82.5008 65.566 82.123 65.1747L71.7509 54.8027C71.3619 54.4138 70.8343 54.1953 70.2843 54.1953C69.7342 54.1953 69.2067 54.4138 68.8177 54.8027L58.4456 65.1747C58.0677 65.566 57.8586 66.09 57.8634 66.6339C57.8681 67.1778 58.0862 67.6981 58.4709 68.0827C58.8555 68.4673 59.3758 68.6855 59.9197 68.6902C60.4636 68.6949 60.9876 68.4858 61.3788 68.108L68.2099 61.2769V87.3855C68.2099 87.9357 68.4284 88.4633 68.8174 88.8523C69.2065 89.2414 69.7341 89.4599 70.2843 89.4599C70.8344 89.4599 71.3621 89.2414 71.7511 88.8523C72.1401 88.4633 72.3587 87.9357 72.3587 87.3855V61.2769L79.1897 68.108Z"
                fill="#1E7BAE"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            <span className="text-primary font-bold">Click to upload</span> or
            drag and drop
          </p>
        </label>
        {SelectedFile && (
          <div className="mt-4">
            <p className="text-green-600">{SelectedFile.name} selected</p>
            <button
              className="text-sm md:text-base mt-2 px-5 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={OnRemoveFile}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <UploadList file={SelectedFile} />
    </div>
  );
};

export default FileUploader;
