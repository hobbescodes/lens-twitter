import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import ProfileComp from "../components/Profile"
import getRecommendedProfiles from "../lib/apollo/queries/recommendedProfiles"
import type { Profile } from "../typings"

const Home: NextPage = () => {
    const [recommendedProfiles, setRecommendedProfiles] = useState<Profile[]>()

    useEffect(() => {
        let initialProfiles: Profile[] = []
        const fetchProfiles = async () => {
            const response = await getRecommendedProfiles()
            const profiles = response.data.recommendedProfiles
            for (let index = 0; index < profiles.length; index++) {
                initialProfiles.push({
                    name: profiles[index].name,
                    id: profiles[index].id,
                    picture: profiles[index].picture,
                    handle: profiles[index].handle,
                    stats: profiles[index].stats,
                    bio: profiles[index].bio,
                    ownedBy: profiles[index].ownedBy,
                    attributes: profiles[index].attributes,
                })
            }
            setRecommendedProfiles(initialProfiles)
        }

        fetchProfiles().catch(console.error)
    }, [])

    return (
        <div>
            {recommendedProfiles?.map((profile) => {
                return <ProfileComp key={profile.id} profile={profile} displayFullProfile={false} />
            })}
        </div>
    )
}

export default Home
