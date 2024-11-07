import {useEffect, useState} from "react"

type IsClientHook = [boolean]

export const useIsClient = (): IsClientHook => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return [isClient]
}