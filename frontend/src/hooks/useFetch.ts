import { useState, useEffect } from 'react'

interface FetchState<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(url: string) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    })

    useEffect(() => {
        let cancelled = false

        async function fetchData() {
            try {
                const res = await fetch(url)
                if (!res.ok) throw new Error(`HTTP : ${res.status}`)
                const json = await res.json()
                if (!cancelled) setState({ data: json, loading: false, error: null })
            } catch (err) {
                if (!cancelled) setState({ data: null, loading: false, error: (err as Error).message })
            }
        }

        fetchData()
        return () => { cancelled = true }

    }, [url])

    return { data: state.data, loading: state.loading, error: state.error }
}
