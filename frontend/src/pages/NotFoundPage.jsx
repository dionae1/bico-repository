import image from '../assets/images/404.png';
import { FcCancel } from "react-icons/fc";
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="flex items-center justify-center bg-gray-100 mb-10 h-screen">
            <div className="grid grid-cols-2 place-items-center w-2/4 mx-auto h-auto p-1 rounded-lg">
                <img src={image} alt="404 Not Found" className='rounded' />
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl font-bold'>
                        <FcCancel className='inline-block text-5xl mb-2' />
                        Page Not Found</h2>
                    <p className='text-gray-600'>Sorry, the page you are looking for does not exist.</p>
                    <Link to="/" className='text-lg mt-4 hover:underline cursor-pointer transition duration-200'>Back to home page</Link>
                </div>
            </div>
        </div>

    );
}
export default NotFoundPage;