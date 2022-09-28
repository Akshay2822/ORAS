import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../slices/authSlice'
const logo = require('../assets/images/logo2.png')
const profile=require('../assets/images/profile.jpg')


const Navbar = () => {

  const signinStatus = useSelector((state) => state.authSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <nav
      style={{ backgroundColor: "#6044E7" }}
      className="navbar navbar-expand-lg navbar-dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img alt="heart" style={{ width: 30, height: 30 }} src={logo} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/search"
              >
                Search
              </Link>
            </li>

            {signinStatus && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myProperties"
                >
                  My Property
                </Link>
              </li>
            )}

            {signinStatus && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/wishlist"
                >
                  Wishlist
                </Link>
              </li>
            )}

            {signinStatus && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/host"
                >
                  Host A Property
                </Link>
              </li>
            )}
            {signinStatus && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myBooking"
                >
                  My Booking
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav navbar-right">
            {signinStatus && (
              <li className="nav-item">
                <Link className="navbar-brand" to="/myProfile">
                  <img
                    alt="profile"
                    style={{ width: 30, height: 30 }}
                    src={profile}
                  />
                </Link>
              </li>
            )}

            {signinStatus && (
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/myProfile"
                >
                  My Profile
                </Link>
              </li>
            )}

            <li className="nav-item">
              {!signinStatus && (
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/signin"
                >
                  Signin
                </Link>
              )}

              {signinStatus && (
                <button
                  style={{ textDecoration: "none", color: "white" }}
                  onClick={() => {
                    // go to signin page
                    navigate("/");

                    // send the action to let the user signout
                    dispatch(signout());
                  }}
                  className="btn btn-link"
                  aria-current="page"
                >
                  Signout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar