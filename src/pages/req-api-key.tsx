import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";


const RequestApiKey = () => {


    const [input, setInput] = useState("")
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (input.length > 0) {
            //todo: check the api key => if it's valid, then save it on local storage, if not show error dialog(it's an commponent)
        }
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
                        <Button type="submit" className="" variant={"default"} onSubmit={(e) => { handleSubmit(e) }}>Start</Button>
                    </form>
                </CardContent>
            </Card>

        </div>
    </>
}

export default RequestApiKey;