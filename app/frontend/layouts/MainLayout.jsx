import { Link } from "@inertiajs/inertia-react";

const MainLayout = ({ children }) => (
  <>
    <div className="main">
      { children }
    </div>
  </>
)

export default page => <MainLayout children={page}/>