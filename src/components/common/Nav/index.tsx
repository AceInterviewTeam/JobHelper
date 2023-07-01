import { Link } from 'react-router-dom';
import NavList from './NavList';
import React from 'react';
import axios from 'axios';
// import express from 'express';
// import multer from 'multer';

// const app = express();
// const express = require("express");
// const upload = multer({ dest: 'uploads/' });



// function App() {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files
//     if (files) {
//       const uploadedFile = files[0]
//       const formData = new FormData()
//       formData.append(uploadedFile.name, uploadedFile)

//       const url = 'http://jsonplaceholder.typicode.com/posts'
//       axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       }).then((res) => {
//         console.log(res)
//       })
//     }
//   }

//   return (
//     <div className="App">
//       <input type="file" name="muFile" onChange={handleFileChange} />
//     </div >
//   );
// }
// import PDFParser from 'pdf-parse';
// import fs from 'fs';

// function parsePdfFile(filePath: string) {
//   const dataBuffer = fs.readFileSync(filePath);
//   PDFParser(dataBuffer).then((pdfData) => {
//     console.log(pdfData.text);
//   });
// }

// app.post('/upload', upload.single('pdfFile'), (req, res) => {
//   const filePath = req.file.path;
//   parsePdfFile(filePath); // 解析PDF文件内容
//   res.send('File uploaded successfully');
// });




const Nav = () => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const uploadedFile = files[0]
      const formData = new FormData()
      formData.append(uploadedFile.name, uploadedFile)

      const url = '/fileUpload'
      axios.post(url, formData, {
      }).then((res) => {
        console.log(res)
        // const filePath = req.file.path;
        // parsePdfFile(filePath); // 解析PDF文件内容
        // res.send('File uploaded successfully');
      })
    }
  }
  return (
    <nav className="flex flex-col w-[300px] lg:hidden  p-4 pt-7 bg-[#F8FAFC] overflow-y-auto">
        <div className="text-[rgb(116,124,153)] p-3 mb-10 font-medium border border-solid border-gray-300 bg-white rounded-md transition-all duration-150 hover:shadow-sectionInput">
          {/* &#43; &nbsp; 上传简历 */}
           <input type="file" name="muFile" onChange={handleFileChange} />
        </div>
        
 
      <Link to="/">
        <div className="text-[rgb(116,124,153)] p-3 mb-10 font-medium border border-solid border-gray-300 bg-white rounded-md transition-all duration-150 hover:shadow-sectionInput">
          &#43; &nbsp; 开始面试
        </div>
      </Link>
      <NavList />
    </nav>
  );
};

export default Nav;
