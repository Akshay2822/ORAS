import Signin from './pages/user/signin';
import Signup from './pages/user/signup';
import ForgotPassword from './pages/user/forgotPassword';
import Navbar from './components/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HostProperty from './pages/property/hostProperty';
import MyProperties from './pages/property/myProperties';
import UploadImage from './pages/property/uploadPropertyImage';
import EditProperty from './pages/property/editProperty';
import Wishlist from './pages/property/myWishlilst';
import Property from './pages/property/home';
import PropertyDetails from './pages/property/viewAndBookProperty';
import EditProfile from './pages/user/editProfile';
import OwnerDetails from './pages/property/viewOwnerDetails';
import AdminHome from './pages/Admin/adminHome';
import UploadProfileImage from './pages/user/uploadProfilePhoto';
import MyProfile from './pages/user/myProfile';
import ViewPropertyOnly from './pages/property/viewPropertyOnly';
import SearchByCity from './pages/property/searchProperty';
import GetAllUser from './pages/Admin/getAllUser';
import GetAllProperty from './pages/Admin/getAllProperty';
import GetBookingReport from './pages/Admin/getBookingReport';
import GetHostingReport from './pages/Admin/getHostingReport'
import MyBooking from './pages/property/myBooking';

function App() {
  return (
     <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/admin-home' element={<AdminHome/>}/>
          <Route path='/getAllUser' element={<GetAllUser/>}/>
          <Route path='/getAllProperty' element={<GetAllProperty/>}/>
          <Route path='/getBookingReport' element={<GetBookingReport/>}/>
          <Route path='/getHostingReport' element={<GetHostingReport/>}/>

          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/uploadProfile' element={<UploadProfileImage/>}/>
          <Route path='/myProfile' element={<MyProfile/>}/>
         

          <Route path='/' element={<Property/>}/>
          <Route path='/host' element={<HostProperty/>}/>
          <Route path='/myProperties' element={<MyProperties/>}/>
          <Route path='/upload-image' element={<UploadImage />} />
          <Route path='/edit-property' element={<EditProperty />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/view-property' element={<PropertyDetails />} />
          <Route path='/view-owner' element={<OwnerDetails />} />
          <Route path='/view-property-only' element={<ViewPropertyOnly />} />
          <Route path='/search' element={<SearchByCity />} />
          <Route path='/myBooking' element={<MyBooking />} />



        </Routes>
        <ToastContainer position='top-center' autoClose={1000}></ToastContainer>
        
     </BrowserRouter>
  );
}



export default App;
