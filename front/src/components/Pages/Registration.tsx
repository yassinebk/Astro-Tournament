import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useInput } from "../utils";
import GoogleLogin from "react-google-login";
import { ALL_USERS } from "../../queries/User";
import { OATH2, REGISTER } from "../../queries/Login";
import { useMutation } from "@apollo/client";
import { userState, tokenState, setNotification } from "../../store";

const Registration = (): JSX.Element => {
  const history = useHistory();
  const [register, register_result] = useMutation(REGISTER, {
    onError: (error: any) => { console.log("error from registration", error);
      setNotification("ERROR", error?.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore: any = store.readQuery({ query: ALL_USERS });
      store.writeQuery({
        query: ALL_USERS,
        data: {
          ...dataInStore,
          allUsers: dataInStore?[...dataInStore.allUser, response.data.addUser]:[response.data.addUser]
        },
      });
    },
    onCompleted: () => {
      history.push("/");
      setNotification(
        "SUCCESS",
        "Welcome player you may set sail in the universe "
      );
    },
  });
  const [oath2,oath2_result] =   useMutation(OATH2, {
    onError: (error: any) => {
      console.log("error from registration", error);
      setNotification("ERROR", error?.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore: any = store.readQuery({ query: ALL_USERS });
      store.writeQuery({
        query: ALL_USERS,
        data: {
          ...dataInStore,
          allUsers: dataInStore?[...dataInStore.allUser, response.data.oath2]:[response.data.oath2]
        },
      });
    },
    onCompleted: () => {
      history.push("/");
      setNotification(
        "SUCCESS",
        "Welcome player you may set sail in the universe "
      );
    },
  });

  useEffect(() => {
    if (register_result.data) {
      const user = register_result.data.register;
      tokenState(user.token.value);
      userState(user.user);
      localStorage.setItem("AuthUser", JSON.stringify(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register_result.data]);

 useEffect(() => {
    if (oath2_result.data) {
      const user =oath2_result.data.register;
      tokenState(user.token.value);
      userState(user.user);
      localStorage.setItem("AuthUser", JSON.stringify(user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register_result.data]);


  const username = useInput("text");
  const email = useInput("email");
  const password = useInput("password");
  const confirmPassword = useInput("password");

  const validatePassord = () => password.value === confirmPassword.value;

  const responseGoogle = (res: any) => {
    const postData = {
      username: res.profileObj.name,
      email: res.profileObj.email,
      password: res.access_token,
    };
    oath2({ variables: postData });
  };

  const submit = () => {
    if (!validatePassord()) {
      setNotification("ERROR", "Password doesn't match");
    }
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    register({ variables: newUser });
  };

  return (
    <section className="flex flex-col items-center h-screen md:flex-row">
      <div className="container mx-auto">
        <div className="flex justify-center px-2 py-6 ">
          <div className="flex w-full rounded-lg xl:w-3/4 lg:w-11/12 lg:shadow-xl ">
            <div className="relative hidden w-full h-auto bg-white bg-cover border-r rounded-l-lg lg:block lg:w-6/12">
              <div className="relative z-10 m-12 text-left ">
                <Link
                  to="/"
                  className="flex items-center w-32 mb-4 font-medium text-blueGray-900 title-font md:mb-10"
                >
                  <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                  <h2 className="text-lg font-bold tracking-tighter text-black uppercase transition duration-500 ease-in-out transform hover:text-lightBlack-500 dark:text-lightBlue-400">
                    Astro Tournament
                  </h2>
                </Link>
                <h2 className="mt-12 mb-2 text-2xl font-semibold tracking-tighter text-black sm:text-3xl title-font">
                  Create an account.
                </h2>
                <div className="w-full mt-16 mb-8 text-base leading-relaxed text-blueGray-900 sm:md:w-3/3 lg:text-1xl ">
                  {" "}
                  What are you waiting for now ? Quickly Register to compete and
                  conquer the Universe !{" "}
                </div>
              </div>
            </div>
            <div className="w-full px-8 py-24 bg-white rounded-lg border-blueGray-100 lg:w-8/12 lg:px-24 lg:py-4 lg:rounded-l-none s">
              <div className="relative z-10 text-left ">
                <div className="flex justify-enter lg:py-6">
                  <GoogleLogin
                    cookiePolicy={"single_host_origin"}
                    clientId="754010975916-3mnrdkq5alekbl03emuio65t6k57uqf4.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <button
                          type="button"
                          className="inline-flex w-full px-4 py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-white border rounded-lg border-blueGray-300 hover:bg-black hover:text-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                        >
                          <div className="flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              className="w-6 h-6"
                              viewBox="0 0 48 48"
                            >
                              <defs>
                                <path
                                  id="a"
                                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                                ></path>
                              </defs>
                              <clipPath id="b">
                                <use xlinkHref="#a" overflow="visible"></use>
                              </clipPath>
                              <path
                                clip-path="url(#b)"
                                fill="#FBBC05"
                                d="M0 37V11l17 13z"
                              ></path>
                              <path
                                clip-path="url(#b)"
                                fill="#EA4335"
                                d="M0 11l17 13 7-6.1L48 14V0H0z"
                              ></path>
                              <path
                                clip-path="url(#b)"
                                fill="#34A853"
                                d="M0 37l30-23 7.9 1L48 0v48H0z"
                              ></path>
                              <path
                                clip-path="url(#b)"
                                fill="#4285F4"
                                d="M48 48L17 24l-4-3 35-10z"
                              ></path>
                            </svg>
                            <span className="ml-4">
                              {" "}
                              Sign Up with Google !{" "}
                            </span>
                          </div>
                        </button>
                      </button>
                    )}
                    buttonText="Sign up"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                  />
                  ,
                </div>
                <form
                  onSubmit={submit}
                  className="mt-6"
                  action="#"
                  method="POST"
                >
                  <div>
                    <label className="block text-base font-medium leading-relaxed text-blueGray-700">
                      User Name
                    </label>
                    <input
                      value={username.value}
                      type={username.type}
                      onChange={username.onChange}
                      name="username"
                      id="login-username"
                      placeholder="Your User Name "
                      className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-base font-medium leading-relaxed text-blueGray-700">
                      Email Address
                    </label>
                    <input
                      onChange={email.onChange}
                      value={email.value}
                      type={email.type}
                      name="email"
                      id="login-email"
                      placeholder="Your Email "
                      className="w-full px-4 py-2 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                      required={true}
                    />
                  </div>
                  <div className="flex flex-wrap mt-4 mb-6 -mx-3">
                    <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                      <label
                        className="text-base font-medium leading-relaxed text-blueGray-700"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        value={password.value}
                        onChange={password.onChange}
                        className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500"
                        id="password"
                        type="password"
                        placeholder="Your Password"
                        required={true}
                      />
                      <p className="mt-1 text-xs italic text-black">
                        Please fill out this field.
                      </p>
                    </div>
                    <div className="w-full px-3 md:w-1/2">
                      <label
                        className="text-base font-medium leading-relaxed text-blueGray-700"
                        htmlFor="confirm"
                      >
                        Confirm
                      </label>
                      <input
                        required={true}
                        onChange={confirmPassword.onChange}
                        value={confirmPassword.value}
                        className="block w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ext-black focus:border-blueGray-500 "
                        id="confirm"
                        type="password"
                        placeholder="Confirm"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform rounded-lg bg-gradient-to-r from-black hover:from-black to-black focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 hover:to-black"
                  >
                    Sign up 
                  </button>
                </form>
                <p className="mt-8 text-center">
                  Already have an account?{" "}
                  <Link
                    to="/Signin"
                    className="font-semibold text-black hover:text-black"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Registration;
