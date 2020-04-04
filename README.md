1. Technology used: react-router mobx less&less-loader express.
2. Technical aspects:
  (1) React single-page application. Due to time constraints, there is no first screen rendering and optimization. The target user is mainly the mobile end, so the width adaptive rem layout is made.
  (2) Cached data is placed in a service of express because it is considered to be deployed independently of non-webpackDevserver. The mockserver's code is in a separate directory in the same code repository.
  (3) Information security: sensitive data should be desensitized, encrypted during transmission, and https should be used in deployment. But I didn't do it because of the limited time.
  (4) Considering that the performance of navigator will be different when embedded in app, the top navigation bar is independently controlled by component transferable parameters. It can be used to further refine whether the navigation bar is displayed in the component and register the callback function to the native app to adapt to h5 and hybrid modes.
  (5) I'm thinking of using cordova to do a webview to embed the written h5 into app, if there's still time.
3. Testing: first of all, the process in demo, the change order of installation user state has been self-tested, at the same time, other states are also processed and judged in the development process, and the operation results of different states are debugged by using mock data.
4. Design ideas:
  (1) Considering the process, I only made two pages for the function of demo, completed all the update activities of the details page on one page, and cached the data of the current viewing contact, and updated it directly locally after a successful operation, so as to avoid frequent calls to background data and keep the operation smooth.
  (2) Some status updates only need to change the status field in the record, so the status field is enumerated to facilitate the function expansion.
  (3) The contact status of the list page will change according to the operation of the contact, so the contact is divided into two parts to add to the global data store.

the demo is deployed on http://teldrasil.top:9000. Please use a mobile phone or Mobile phone Simulation in chrome's devtool to test it.

![QRCode](sitecode.png)