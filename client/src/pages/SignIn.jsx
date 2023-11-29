import{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
export default function SignIn() {
 const [formData, setFormData] = useState({});// keep track old data
const{loading, error} = useSelector((state) => state.user);
 // change sign up button text to loading
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const handleChange = (e) => {
  setFormData({
    ...formData,// keep form data
    [e.target.id]: e.target.value, // what ever changes set value/ keep data entered
  });
 }
 const handleSubmit = async (e)=> {
  e.preventDefault();// prevent refreshing page// submit / post data
  try {
    dispatch(signInStart());
    const res=await fetch('/api/auth/signin', { // submit form to db
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),// change to strings
    });
    const data = await res.json();// convert to json await response
    console.log(data)
    if(data.success === false){// disable when loading and show loading effect
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
  }catch (error) {
    dispatch(signInFailure(error.message));
  }
 };
return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold 
      my-7'>Sign In</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
          
          <input 
          type="email" 
          placeholder='email' 
          className='border p-3 rounded-lg' 
          id='email' onChange={handleChange}
          />
          
          
          <input 
          type="password" 
          placeholder='password'
          className='border p-3 rounded-lg' 
          id='password' onChange={handleChange}
          />
          
          <button 
           disabled={loading}
          className='bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-95
          disabled:opacity-80'
          >
            {loading ? 'Loading...' :'Sign In'}
            </button>
            <OAuth/>
        </form>

        <div className='flex gap-2 mt-5'>
          <p>No account?</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-700'>Sign up</span>
          </Link>
        </div>
         {error && <p className='text-red-500 mt-5'>{error}</p>}
      </div>
  );
}
