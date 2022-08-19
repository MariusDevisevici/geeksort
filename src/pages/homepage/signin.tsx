import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import Image from "next/image";
function signin({ providers }: { providers: any }) {
  return (
    <div className="flex h-screen sm:flex-nowrap flex-wrap">
      <div className="w-full flex flex-col justify-center items-center">
        <div className=" bg-white w-3/4 py-20  flex flex-col items-center text-center justify-center shadow-sm">
          <p className="text-2xl font-bold mb-2 pl-10">
            <span className="text-purple-600">Hi</span> there!
          </p>
          <div>
            {Object.values(providers).map((provider: any) => {
              const img = "/" + provider.name + ".png";

              return (
                <div key={provider.name} className="flex items-center gap-2">
                  <Image src={img} width={40} height={40}></Image>
                  <button
                    className={
                      provider.name === "Discord"
                        ? " mb-2 font-bold relative z-10 text-discord border-discord border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2  cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-discord hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
                        : " mb-2 font-bold relative z-10 text-black border-black border-2 hover:text-white  transition-all duration-300 ease-in-out px-4 py-2  cursor-pointer rounded-md before:z-minusOne  before:absolute before:bg-black hover:before:w-full  before:w-0   before:h-full before:top-0 before:left-0  before:transition-all before:duration-300 before:origin-left"
                    }
                    onClick={() => signIn(provider.id)}
                  >
                    Sign in with {provider.name}{" "}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <Image src={"/bgk.jpg"} layout="fill" objectFit="cover"></Image>
      </div>
    </div>
  );
}

export default signin;

export async function getServerSideProps(context: any) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(context),
    },
  };
}
