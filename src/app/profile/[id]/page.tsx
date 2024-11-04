export default function UserProfile({params}: any ) {
    return (
      <div className="main_screen flex flex-col min-h-screen justify-center items-center">
          <div className="heading text-3xl ">Profile page {params.id}</div>
      </div>
    );
  }
  