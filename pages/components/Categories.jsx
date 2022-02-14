import {useState, useEffect} from 'react'
import {getCategories} from '../../services';
import Link from 'next/link'
const Categories = () => {
const [categories , setcategories ] = useState([]);
useEffect(()=>{
  getCategories()
  .then(res=>setcategories(res));
}, [])
  return (
    <div className="bg-white shadow-lg p-8 mb-8">
    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
      Categories
      </h3>
      <div className="flex flex-col  justify-flex-start align-center">
      {
        categories.map((item)=>(
          <Link key={item.slug} href={`/category/${item.slug}`}>
            <span className="transition duration-700 text-indigo-500 hover:text-indigo-900 text-lg cursor-pointer">
              {item.name}
            </span>
          </Link>
        ))
      }
      </div>
    </div>
  )
}

export default Categories