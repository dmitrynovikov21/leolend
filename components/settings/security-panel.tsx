"use client"

import * as React from "react"
import { ShieldCheck, History } from "lucide-react"
import { toast } from "sonner"

import { Switch } from "@/components/ui/switch"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SecurityPanel() {
    const [mfaEnabled, setMfaEnabled] = React.useState(false)

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Security</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account security and audit logs.
                </p>
            </div>

            {/* MFA SECTION */}
            <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-base font-medium">Multi-Factor Authentication</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Require an email verification code when logging in from a new device.
                    </p>
                </div>
                <Switch
                    checked={mfaEnabled}
                    onCheckedChange={(val) => {
                        setMfaEnabled(val)
                        if (val) {
                            toast.success("MFA Enabled", { description: "You will now be asked for a code on login." })
                        } else {
                            toast.warning("MFA Disabled", { description: "Your account is less secure." })
                        }
                    }}
                />
            </div>

            {/* AUDIT LOG */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-muted-foreground" />
                        <CardTitle>Audit Log</CardTitle>
                    </div>
                    <CardDescription>
                        Recent sensitive actions performed in your workspace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Action</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">User Login</TableCell>
                                <TableCell>dima@example.com</TableCell>
                                <TableCell>Just now</TableCell>
                                <TableCell className="text-right"><Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">Success</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Update Billing</TableCell>
                                <TableCell>dima@example.com</TableCell>
                                <TableCell>2 hours ago</TableCell>
                                <TableCell className="text-right"><Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200">Success</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">Delete Agent "Sales Bot"</TableCell>
                                <TableCell>sarah@example.com</TableCell>
                                <TableCell>Yesterday</TableCell>
                                <TableCell className="text-right"><Badge variant="outline" className="text-orange-600 bg-orange-50 border-orange-200">Warning</Badge></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
