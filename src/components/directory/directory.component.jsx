import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles';


const categories = 
[
  {
    "id": 1,
    "title": "Hats",
    "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
    "route" : "shop/hats"
  },
  {
    "id": 2,
    "title": "Jackets",
    "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
    "route" : "shop/jackets"
  },
  {
    "id": 3,
    "title": "Sneakers",
    "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
    "route" : "shop/sneakers"
  },
  {
    "id": 4,
    "title": "Womens",
    "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
    "route" : "shop/womens"
  },
  {
    "id": 5,
    "title": "Mens",
    "imageUrl": "https://scontent.fisb1-2.fna.fbcdn.net/v/t39.30808-6/284559132_1495990897499378_3740076308335122168_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aGt3NjMb8hcAX-KO9cS&_nc_ht=scontent.fisb1-2.fna&oh=00_AT9aEJ5GYIi03C5BP2o3UZiwV8KL7lNTzCiodk7fo4uvPw&oe=629A21DA",
    "route" : "shop/mens"
  }
]

const Directory = () => {


    return(


    <DirectoryContainer >
      
    {categories.map((category) => {
      return (
        <DirectoryItem key={category.id} category= {category} />
        )
    })}
    </DirectoryContainer>
  )
}



export default Directory;