import './ProfileCard.css'

function ProfileCard({name,image,biodata}){
    return(
        <>
        <div className="card">
            <img className="img" src={image}></img>
            <hr />
            <div className="name">{name}</div>
            <div className="biodata">{biodata}</div>
        </div>
        </>
    )
}

export default ProfileCard;