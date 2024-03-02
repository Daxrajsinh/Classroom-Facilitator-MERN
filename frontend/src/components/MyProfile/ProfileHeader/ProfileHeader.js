// import { Avatar , stringAvatar} from '@mui/material';
// import './profileHeader.css';

// export default function ProfileHeader() {
//     return(
//         <div className='profile' style={{marginTop:'30px'}}>
//             <div className='ProfileAndName'>
//                 <Avatar sx={{ height: '58px', width: '58px' }} />
//                 {/* <Avatar {...stringAvatar(("username"))} /> */}
//                 <div className='nameAndActive'>
//                     <div className='name'>{localStorage.getItem("username")}</div>
                    
//                     <p>User since <strong>{localStorage.getItem("since")}</strong></p>
//                 </div> 
//             </div>

//             {/* <hr Style="border: 0.7px solid " /> */}
//             <hr Style="width: 100%; border-width: 1px; border-style: solid; border-color: black;"/>
//         </div>
//     )
// }


import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import './profileHeader.css';
import { green } from '@mui/material/colors';

const AvatarStyled = styled(Avatar)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.main,
  backgroundColor: green[600],
//   backgroundColor: green,
  color: '#fff',
  fontSize: '1.7rem',
  textTransform: 'uppercase',
}));

export default function ProfileHeader() {
  const username = localStorage.getItem("username");

  return(
    <div className='profile' style={{marginTop:'30px'}}>
      <div className='ProfileAndName'>
        <AvatarStyled>{username.charAt(0)}</AvatarStyled>
        <div className='nameAndActive'>
          <div className='name'>{username}</div>
          <p>User since <strong>{localStorage.getItem("since")}</strong></p>
        </div> 
      </div>

      <hr Style="width: 100%; border-width: 1px; border-style: solid; border-color: black;"/>
    </div>
  )
}
