import React from 'react'

const ResultProfile = ({name,pic,email}) => {
  return (
    <>
      <div className='user-profile-container'>
        <img className='profile-image' src={pic} alt="Profile Image" />
        <div className='profile-info' style={{display:'flex',flexDirection:'column'}}>
            <label style={{fontSize:'medium'}}>{name}</label>
            <span style={{fontSize:'x-small'}}>{email}</span>
        </div>
      </div>
    </>
  )
}

export default ResultProfile
