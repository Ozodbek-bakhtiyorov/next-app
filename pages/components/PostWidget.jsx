import {useEffect,useState} from 'react'
import moment from 'moment'
import Link from 'next/link'
import { getRecentPosts, getSimilarPosts} from '../../services'

const PostWidget = ({categories,slug}) => {
  const [relatedposts, setRelatedposts] = useState([]);
  useEffect(() => {
    if(slug){
      getSimilarPosts(categories,slug)
        .then(res=>setRelatedposts(res))
    }
    else{
      getRecentPosts()
        .then(result=>setRelatedposts(result))
    }
  }, [slug]);
  return (
    <div>
       <div className="bg-white shadow-lg p-8 mb-8">
         <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {
              slug? "Related Posts" : "Recent Posts"
            }
         </h3>
         {relatedposts.map((post,index)=>(
           <div className='flex items-center w-full mb-4 ' key={index}>
             <div className="w-16 flex-none">
               <img 
                src={post.featuredimage.url}
                alt={post.title}
                className='rounded-full h-16 w-16 object-cover object-center align-middle'
               />
             </div>
             <div className="flex-grow ml-4 border-b">
               <p className='text-gray-500 font-xs'>
                  {moment(post.createAt).format("MMM DD YYYY")}
               </p>
                <Link href={`/post/${post.slug}`}>
                  <a className='transition duration-700 cursor-pointer text-indigo-500 hover:text-indigo-900 text-lg'>{post.title}</a>
                </Link>
             </div>
           </div>
         ))}
       </div>
    </div>
  )
}

export default PostWidget