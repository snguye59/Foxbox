"use client";

import styles from "./FilesUploadPage.module.css";
import Link from "next/link";
import { useState } from "react";
import { useKey } from "src/hooks/useKey";
import { fileService } from "src/services";
import { useUser } from "src/hooks/useUser";
import { useFiles } from "src/hooks/useFiles";
import { useLoading } from "src/hooks/useLoading";
import { useErrorDisplay } from "src/hooks/useErrorDisplay";
import { WarningModal } from "src/components/modals";
import { NewEntryButton } from "src/components/buttons";
import { FileDownloadCard } from "src/components/cards";
import { FilesAttachmentForm } from "src/components/forms";
import { OverlayBackground } from "src/components/backgrounds";

const FilesUploadPage = () => {
  const { uid } = useUser();
  const { secretKey } = useKey();

  const { files, handleFilesSync } = useFiles();
  const [uploads, setUploads] = useState([]);
  const [downloads, setDownloads] = useState({});

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const { handleErrorDisplay } = useErrorDisplay();
  const { isLoading, handleAsyncOperation } = useLoading();

  function handleFormOpen() {
    setShowForm(true);
  }

  function handleFormClose() {
    setShowForm(false);
  }

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalClose(e) {
    if (!e || e.target === e.currentTarget) {
      setShowModal(false);
    }
  }

  function handleFilesUpload(e) {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length + uploads.length > 3) {
      handleErrorDisplay(
        "You can only have 3 simultaneous uploads. Please select fewer files or wait until the current uploads are complete."
      );
      return;
    }
    selectedFiles.forEach(async (file) => {
      if (file.size > 20 * 1024 * 1024) {
        handleErrorDisplay(
          "Some files exceeded the maximum allowed size of 20MB and won't be uploaded."
        );
        return;
      }
      const newUpload = {
        file,
        progress: 0,
        uploadTask: null,
      };
      setUploads((uploads) => [...uploads, newUpload]);

      const path = `users/${uid}/files/${file.name}@${new Date().getTime()}`;

      const pathData = {
        path,
        data: file,
        encryptionKey: secretKey,
        onUploadsUpdate: setUploads,
      };
      const { url, error } = await fileService.uploadFile(pathData);
      if (error) {
        handleErrorDisplay(error);
        handleUploadCancel(newUpload);
        return;
      }
      const newFile = {
        name: file.name,
        size: file.size,
        createdBy: uid,
        url,
        path,
      };
      handleFileSave(newFile);
    });
  }

  async function handleFileSave(data) {
    const pathData = {
      path: `users/${uid}/files`,
      data,
      encryptionKey: secretKey,
    };
    const { fileId, error } = await fileService.saveFile(pathData);
    if (error) {
      handleErrorDisplay(error);
      return;
    }
    await handleFilesSync({
      path: `users/${uid}/files`,
      decryptionKey: secretKey,
    });
  }

  async function handleFileDownload(fileId) {
    if (downloads[fileId] && downloads[fileId].progress) {
      handleErrorDisplay("Download already in progress for this file.");
      return;
    }
    const pathData = {
      data: files[fileId],
      decryptionKey: secretKey,
      onDownloadsUpdate: setDownloads,
    };
    const { decryptedBlob, error } = await fileService.downloadFile(pathData);
    if (error) {
      handleErrorDisplay(error);
      return;
    }
    const blobUrl = URL.createObjectURL(decryptedBlob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = files[fileId].name;
    link.click();

    URL.revokeObjectURL(blobUrl);

    link.remove();

    setDownloads((downloads) => {
      const updatedDownloads = { ...downloads };
      delete updatedDownloads[fileId];
      return updatedDownloads;
    });
  }

  function handleUploadCancel(upload) {
    upload.uploadTask && upload.uploadTask.cancel();

    setUploads((uploads) =>
      uploads.filter(({ file }) => file.name !== upload.file.name)
    );
  }

  function handleDownloadCancel(fileId) {
    downloads[fileId] && downloads[fileId].controller.abort();

    setDownloads((downloads) => {
      const updatedDownloads = { ...downloads };
      delete updatedDownloads[fileId];
      return updatedDownloads;
    });
  }

  async function handleFileDelete() {
    await handleAsyncOperation(async () => {
      const { id, path } = files[selectedFileId];
      const pathData = {
        firestorePath: `users/${uid}/files/${id}`,
        storagePath: path,
      };
      const { success, error } = await fileService.deleteFile(pathData);
      if (error) handleErrorDisplay(error);
      if (success)
        await handleFilesSync({
          path: `users/${uid}/files`,
          decryptionKey: secretKey,
        });
      setShowModal(false);
    });
  }

  return (
    <div className={styles.wrapper}>
      {showForm && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.form}>
            <FilesAttachmentForm
              uploads={uploads}
              onChange={handleFilesUpload}
              onCancel={handleUploadCancel}
              onClose={handleFormClose}
            />
          </div>
        </>
      )}
      {showModal && (
        <>
          <OverlayBackground position="fixed" isBlur />
          <div className={styles.modal} onClick={handleModalClose}>
            <WarningModal
              title="Confirm File Deletion"
              description="Please confirm if you wish to proceed with deleting this file. This action is irreversible."
              isLoading={isLoading}
              onSubmit={handleFileDelete}
              onCancel={handleModalClose}
            />
          </div>
        </>
      )}
      <div className={styles.contentWrapper}>
        <NewEntryButton text="New file" onClick={handleFormOpen} />
        <div className={styles.files}>
          <div className={styles.cards}>
            <Link
              href="https://firebasestorage.googleapis.com/v0/b/foxbox-5653c.firebasestorage.app/o/Foxbox%20User%20Manual.pdf?alt=media&token=51fa9a36-41d5-46f3-abf1-76fb6a17afca"
              target="_blank"
            >
              <FileDownloadCard
                data={{
                  name: "Foxbox User Manual.pdf",
                  size: 14030,
                }}
              />
            </Link>
            {Object.keys(files).map((key) => (
              <FileDownloadCard
                key={key}
                data={files[key]}
                progress={downloads[key]?.progress}
                onDownload={() => handleFileDownload(key)}
                onCancel={() => handleDownloadCancel(key)}
                onDelete={() => {
                  setSelectedFileId(key);
                  handleModalOpen();
                }}
              />
            ))}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesUploadPage;
