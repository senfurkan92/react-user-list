export default function InfoRow({user, removeUser}) {
    return (
        <div style={{display: 'grid', gap:'1rem', gridTemplateColumns: 'repeat(4, max-content) auto'}}>
            <div>
                {user.id}
            </div>
            <div>
                {user.name}
            </div>
            <div>
                {user.lastname}
            </div>
            <div>
                ({user.age} Years old)
            </div>
            <div className="text-right">
                <button className="text-white border border-red-500 bg-red-400 rounded-lg
                    py-1 px-3" onClick={() => removeUser(user.id)}>
                    X
                </button>
            </div>
        </div>
    )
}