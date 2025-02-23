import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { authOptions } from "../auth/[...nextauth]/option";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  await dbConnect();
  
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserModel.findById(session.user._id).select("healthReports");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ success: true, history: user.healthReports });
  } catch (error) {
    console.error("Error fetching history:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
