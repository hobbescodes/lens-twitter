export type Attribute = {
    displayType: string
    key?: string
    traitType: null
    value: string
    _typename: string
}

export type ProfilePic = {
    original: {
        mimeType: null
        url: string
        _typename: string
    }
    _typename: string
}

export type Stats = {
    totalCollects: number
    totalComments: number
    totalFollowers: number
    totalFollowing: number
    totalMirrors: number
    totalPosts: number
    totalPublications: number
    _typename: string
}

export interface Profile {
    name: string
    id: string
    handle: string
    stats: Stats
    picture: ProfilePic
    bio: string
    ownedBy: string
    attributes: Attribute[]
}

export interface Post {
    attributes: Attribute[]
    content: string
    description: string
    media: string[]
    name: string
}
