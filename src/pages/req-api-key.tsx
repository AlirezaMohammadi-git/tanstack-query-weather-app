import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthorizeApiKey } from "@/hooks/use-weather";
import { useEffect, useState } from "react";
import { toast } from "sonner"


const RequestApiKey = () => {

    const [input, setInput] = useState("");
    const invalidApiKeyToastOptions = {
        title: "Invalid api key!",
        description: `Use "openweathermap.org" to get api key.`,
        action: {
            label: "open website",
            onClick: () => { window.open("https://openweathermap.org/") }
        }
    }
    const { mutate, data, isPending } = useAuthorizeApiKey(input)
    useEffect(() => {
        if (input.length > 8 && data && !isPending) {
            window.localStorage.setItem("api-key", input)
            window.location.reload();
        } else if (!isPending) {
            toast.error(
                invalidApiKeyToastOptions.title, {
                description: invalidApiKeyToastOptions.description,
                action: invalidApiKeyToastOptions.action,
                closeButton: true,
            }
            )
        }
    }, [isPending])

    const handleAuthorization = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        mutate();
    }


    return <>
        <div className="w-full flex justify-center items-center">

            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>API Needed!</CardTitle>
                    <CardDescription>Grab your free api key from <a href="https://openweathermap.org/" target="_blank"><Button className="text-yellow-500" variant={"link"}>OpenWeather</Button></a> website and enter it here.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <form className="w-full flex gap-4">
                        <Input className="" id="api-key" type="text" placeholder="API key..." value={input} onChange={(e) => { setInput(e.target.value) }}></Input>
                        <Button type="button" className="" variant={"default"} onClick={(e) => { handleAuthorization(e) }}>Start</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center items-center w-full">
                        {isPending && <Spinner size={"large"} />}
                    </div>
                </CardFooter>
            </Card>

        </div>
    </>
}

export default RequestApiKey;