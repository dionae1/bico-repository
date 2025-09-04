import image from '../assets/images/404.png';
import { FcCancel } from "react-icons/fc";

function NotFoundPage() {
    return (
        <div className="grid grid-cols-2 place-items-center w-2/4 mx-auto mt-20 h-auto shadow-xl/15 p-1 rounded-lg">
            <img src={image} alt="404 Not Found" className='rounded' />
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-bold'>
                    <FcCancel className='inline-block text-5xl mb-2' />
                    Page Not Found</h2>
                <p className='text-gray-600'>Sorry, the page you are looking for does not exist.</p>
            </div>
        </div>
    );
}
export default NotFoundPage;