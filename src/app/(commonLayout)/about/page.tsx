export const dynamic = 'force-dynamic';

export default async function About() {

    await new Promise((resolve) => setTimeout(resolve, 4000));
    //throw new Error("This is error");


    return (
        <div>This is about page</div>
    );
}