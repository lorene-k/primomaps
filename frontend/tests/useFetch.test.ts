import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../src/hooks/useFetch";

afterEach(() => {
    vi.unstubAllGlobals();
});

describe("useFetch", () => {
    it("starts in a loading state with no data or error", () => {
        vi.stubGlobal(
            "fetch",
            vi.fn(() => new Promise(() => {})),
        );

        const { result } = renderHook(() => useFetch("/some-url"));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it("sets data and clears loading on a successful response", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ foo: "bar" }),
            }),
        );

        const { result } = renderHook(() => useFetch("/some-url"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual({ foo: "bar" });
        expect(result.current.error).toBeNull();
    });

    it("sets an error message when the response is not ok", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                json: () => Promise.resolve(null),
            }),
        );

        const { result } = renderHook(() => useFetch("/some-url"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe("HTTP : 404");
    });

    it("sets an error message when fetch itself rejects (network error)", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockRejectedValue(new Error("Network down")),
        );

        const { result } = renderHook(() => useFetch("/some-url"));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toBeNull();
        expect(result.current.error).toBe("Network down");
    });

    it("ignores a stale response if the url changes before it resolves", async () => {
        let resolveFirst: (res: unknown) => void = () => {};
        const firstResponse = new Promise((resolve) => {
            resolveFirst = resolve;
        });

        const fetchMock = vi
            .fn()
            .mockReturnValueOnce(firstResponse)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ from: "second" }),
            });
        vi.stubGlobal("fetch", fetchMock);

        const { result, rerender } = renderHook(({ url }) => useFetch(url), {
            initialProps: { url: "/first" },
        });

        rerender({ url: "/second" });
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual({ from: "second" });

        resolveFirst({
            ok: true,
            json: () => Promise.resolve({ from: "first" }),
        });
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(result.current.data).toEqual({ from: "second" });
    });
});
