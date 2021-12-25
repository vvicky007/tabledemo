import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import TableDemo from './TableDemo'
import DisplayUL from './DisplayUL';
// const treeData = [
//   {
//     id: "0",
//     label: "Measure",
//     icon: "fa fa-folder",
//     title: "Documents Folder",
//     visibility:false,
//     children: [
//       {
//         id: "0-0",
//         label: "H3816",
//         icon: "fa fa-folder",
//         title: "Documents Folder",
//         visibility:false,
//         children: [
//           {
//             id: "0-1-1",
//             label: "Diabetes",
//             icon: "fa fa-file",
//             visibility:false,
//             title: "Documents Folder",
//           },
//           {
//             id: "0-1-2",
//             label: "Chronic heart disease",
//             icon: "fa fa-file",
//             visibility:false,
//             title: "Documents Folder",
//             children:[
//               {
//                 id: "0-1-2-0",
//                 label: "Indigestion",
//                 icon: "fa fa-file",
//                 visibility:false,
//                 title: "Documents Folder",
//                 children:[
//                   {
//                     id: "0-1-2-0-0",
//                     label: "Gaestro",
//                     icon: "fa fa-file",
//                     title: "Documents Folder",
//                     visibility:false,
//                   },
//                 ]
//               },
             
//             ]
//           },
//           {
//             id: "0-1-3",
//             label: "Colorectal Screening",
//             icon: "fa fa-file",
//             visibility:false,
//             title: "Documents Folder",
//           },
//           {
//             id: "0-1-4",
//             label: "Kidney",
//             icon: "fa fa-file",
//             visibility:false,
//             title: "Documents Folder",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: "1",
//     label: "H6184",
//     icon: "fa fa-desktop",
//     title: "Desktop Folder",
//     visibility:false,
//     children: [
//       {
//         id: "1-0",
//         label: "Indigestion",
//         icon: "fa fa-file",
//         title: "Documents Folder",
//         visibility:false,
//       },
//       {
//         id: "0-0",
//         label: "Orthopedic surgeris",
//         icon: "fa fa-file",
//         title: "Documents Folder",
//         visibility:false,
//       },
//     ],
//   },
//   {
//     id: "2",
//     label: "H9762",
//     icon: "fa fa-download",
//     title: "Downloads Folder",
//     visibility:false,
//     children: [],
//   },
// ];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const {loggedIn} = this.state;
    return (
      <Router ref={(router) => this.router = router}>
        <div>
          {/* <NavBar loggedIn={loggedIn} onLogout={this.handleLogout.bind(this)} /> */}
          <section className="section">
            <div className="container">
              <Routes>
                <Route exact path="/" element={<TableDemo/>} />
                <Route exact path="/voicetotext" element={<DisplayUL/>} />
              </Routes>
            </div>
          </section>
        </div>
      </Router>
    );
  }
}