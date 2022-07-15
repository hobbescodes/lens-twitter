import { useRouter } from "next/router"
import getProfileQuery from "../../lib/apollo/queries/fetchProfileQuery"

import ProfileComp from "../../components/Profile"
import { useEffect, useState } from "react"
import { Post, Profile } from "../../typings"
import PostComp from "../../components/Post"

const ProfilePage = () => {
    const router = useRouter()
    const { id } = router.query
    const [profile, setProfile] = useState<Profile>()
    const [posts, setPosts] = useState<Post[]>()

    useEffect(() => {
        let userPosts: Post[] = []

        const fetchProfile = async () => {
            const response = await getProfileQuery(id as string)
            // console.log(response)
            const userProfile = response.data.profile
            const initialPosts = response.data.publications.items
            let initialProfile: Profile = {
                name: userProfile.name,
                id: userProfile.id,
                picture: userProfile.picture,
                handle: userProfile.handle,
                stats: userProfile.stats,
                bio: userProfile.bio,
                ownedBy: userProfile.ownedBy,
                attributes: userProfile.attributes,
            }
            for (let index = 0; index < initialPosts.length; index++) {
                userPosts.push({
                    attributes: initialPosts[index].metadata.attributes,
                    content: initialPosts[index].metadata.content,
                    description: initialPosts[index].metadata.description,
                    media: initialPosts[index].metadata.media,
                    name: initialPosts[index].metadata.name,
                })
            }
            setProfile(initialProfile)
            setPosts(userPosts)
        }

        fetchProfile().catch(console.error)
    }, [])

    return (
        <div className="flex flex-col p-8 items-center">
            {profile ? <ProfileComp profile={profile} displayFullProfile={true} /> : null}
            <div>
                {posts?.map((post, index) => {
                    return <PostComp key={index} post={post} />
                })}
            </div>
        </div>
    )
}

export default ProfilePage
