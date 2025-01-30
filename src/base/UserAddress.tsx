import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function UserAddress() {
  return (
    <div className="py-10">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}

export default UserAddress;
