import {
    Input,
    Button,
    Card,
    CardBody,
    Image,
    Checkbox,
  } from "@nextui-org/react";
  import { Link } from "react-router-dom";
  import favicon from "../../assets/greenreturn_favicon.png";
  
  export default function Signup() {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col text-center justify-center items-center my-4">
          <Image
            radius="none"
            alt="favicon"
            src={favicon}
            className="mx-auto"
            isBlurred
            width={100}
          />
          <h1 className="text-2xl font-semibold my-2">Sign up to your account</h1>
        </div>
        <div className="my-6">
          <Card className="max-w-full w-[500px] p-4">
            <CardBody className="overflow-hidden">
              <form className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  labelPlacement="outside"
                  className="my-2"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  labelPlacement="outside"
                  className="my-2"
                />
                <div className="flex justify-between my-2">
                  <Checkbox>
                    <p className="font-normal text-sm">Remember me</p>
                  </Checkbox>
                  <Link to="#">
                    <p className="font-semibold text-sm text-primary">
                      Forgot password?
                    </p>
                  </Link>
                </div>
                <div className="flex gap-2 justify-end ">
                  <Button
                    fullWidth
                    color="primary"
                    className="font-semibold"
                    as={Link}
                    href="#"
                    variant="solid"
                    radius="sm"
                  >
                    Sign up
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
          <div className="text-center flex text-sm my-8 justify-center">
            <p>Already have an account?</p>
            <Link to={"/login"}>
              <p className="font-semibold text-primary mx-1">Login</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  