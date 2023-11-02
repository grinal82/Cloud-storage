import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFiles, uploadFile } from '../store/filesReducer';


export const UserStorage = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.users);
  const userFiles = useSelector((state) => state.files.files);
  const [localUser, setLocalUser] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [fileComment, setFileComment] = useState('');

  useEffect(() => {
    setLocalUser(user);
    dispatch(fetchFiles())
  }, [user, dispatch]);

  const handleFileSelect = (file)=> {
    setSelectedFile(file);
    setNewFileName(file.name);
  }

  const handleDelete = (file) => {
    // dispatch(deleteFile(file.id));
    setSelectedFile(null);
  }

  const handleRename = () => {
    // dispatch(renameFile(selectedFile, newFileName));
    setSelectedFile(null);
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('comment', fileComment);
    console.log('File', formData.get('file'));
    console.log('Comment', formData.get('comment'));
    dispatch(uploadFile(formData));
  }

  const handleGenerateLink = () => {
    // dispatch(generateFileLink(selectedFile.id));
  }

  return (
    <div className="user-storage">
      <div className="file-list">
        <h3>Your Files</h3>
        <ul>
          {userFiles.length>0 ? userFiles.map((file) => (
            <li key={file.id} onClick={() => handleFileSelect(file)}>{file.name}</li>
          )): <div>No files uploaded yet</div>}
        </ul>
      </div>
      {selectedFile && (
        <div className="file-details">
          <h4>File Details</h4>
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
          <button onClick={handleRename}>Rename</button>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleGenerateLink}>Generate Link</button>
        </div>
      )}
      <div className="file-upload">
        <h4>Upload a New File</h4>
        <input
        className='file-input' 
        type="file" 
        onChange={(e) => {
          console.log('File selected', e.target.files[0]);
          setFileToUpload(e.target.files[0])
          }} 
        />
        <input
          type="text"
          placeholder="File Comment"
          value={fileComment}
          onChange={(e) => setFileComment(e.target.value)}
        />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  )
}
