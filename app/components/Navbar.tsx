import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="">
        <p className="text-2xl font-bold text-gradient">ATS Analyzer</p>
      </Link>
      <Link to='/upload' className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  )
}

export default Navbar