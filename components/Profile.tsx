import Link from "next/link"
import type { Profile } from "../typings"

type ProfileProps = {
    profile: Profile
    displayFullProfile: boolean
}

const ProfileComp = ({ profile, displayFullProfile }: ProfileProps) => {
    return (
        <div className="p-8">
            <Link href={`/profile/${profile.id}`}>
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                    <div className="md:flex">
                        <div className="md:shrink-0">
                            {profile.picture ? (
                                <img
                                    src={
                                        profile.picture.original
                                            ? profile.picture.original.url.replace(
                                                  "https://ipfs.infura.io/ipfs/",
                                                  "https://ipfs.io/ipfs/"
                                              )
                                            : "/vercel.svg"
                                    }
                                    className="h-48 w-full object-cover md:h-full md:w-48"
                                />
                            ) : (
                                <div className="h-48 w-full object-cover md:h-full md:w-48 bg-gray-400" />
                            )}
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {profile.handle}
                                {displayFullProfile && profile.name && " (" + profile.name + ")"}
                            </div>
                            <div className="block mt-1 text-sm leading-tight font-medium text-black hover:underline">
                                {profile.bio}
                            </div>
                            <div className="mt-2 text-sm text-slate-900">{profile.ownedBy}</div>
                            <p className="mt-2 text-xs text-slate-500">
                                following: {profile.stats.totalFollowing} followers:{" "}
                                {profile.stats.totalFollowers}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProfileComp
