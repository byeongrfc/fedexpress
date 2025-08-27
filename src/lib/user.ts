import User, { IUser } from "@/models/User";
import { connectToDatabase } from "./mongoose";
import { destroySession, getSessionUserId } from "./session";
import { redirect } from "next/navigation";
import { FlattenMaps, Types } from "mongoose";

export async function getUser(
  redirectIfNotFound: true,
  select?: string
): Promise<
  FlattenMaps<IUser> &
    Required<{
      _id: Types.ObjectId;
    }> & {
      __v: number;
    }
>;
export async function getUser(
  redirectIfNotFound: false,
  select?: string
): Promise<
  | (FlattenMaps<IUser> &
      Required<{
        _id: Types.ObjectId;
      }> & {
        __v: number;
      })
  | null
>;
export async function getUser(
  redirectIfNotFound: boolean,
  select: string = "-password"
) {
  const userId = await getSessionUserId();

  if (!userId) {
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  await connectToDatabase();
  const user = await User.findById(userId).select(select).lean().exec();

  if (!user) {
    await destroySession();
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  return user;
}
