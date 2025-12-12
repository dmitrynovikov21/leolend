"use client"

import * as React from "react"
import { MoreHorizontal, Plus, Shield, User, Mail } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const initialMembers = [
    {
        id: "1",
        name: "Dima Novikov",
        email: "dima@example.com",
        role: "owner",
        avatar: "/avatars/01.png",
    },
    {
        id: "2",
        name: "Sarah Miller",
        email: "sarah@example.com",
        role: "admin",
        avatar: "/avatars/02.png",
    },
    {
        id: "3",
        name: "Dev Team",
        email: "dev@example.com",
        role: "viewer",
        avatar: "/avatars/03.png",
    },
]

export function TeamManagement() {
    const [members, setMembers] = React.useState(initialMembers)
    const [inviteEmail, setInviteEmail] = React.useState("")
    const [inviteRole, setInviteRole] = React.useState("editor")

    const handleInvite = () => {
        setInviteEmail("")
        toast.success("Invitation Sent", {
            description: `Invitation sent to ${inviteEmail} as ${inviteRole}.`,
        })
    }

    const removeMember = (id: string) => {
        setMembers(prev => prev.filter(m => m.id !== id))
        toast.error("Member Removed", {
            description: "User access has been revoked."
        })
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Team Members</h3>
                <p className="text-sm text-muted-foreground">
                    Manage who has access to this workspace.
                </p>
            </div>
            <Separator />

            {/* INVITE CARD */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Invite New Member</CardTitle>
                    <CardDescription>
                        Invite a new user by email to join your workspace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row items-end gap-3">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                placeholder="colleague@company.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid w-full sm:w-[180px] gap-1.5">
                            <Label htmlFor="role">Role</Label>
                            <Select value={inviteRole} onValueChange={setInviteRole}>
                                <SelectTrigger id="role">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="editor">Editor</SelectItem>
                                    <SelectItem value="viewer">Viewer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleInvite} disabled={!inviteEmail} className="w-full sm:w-auto">
                            <Plus className="mr-2 h-4 w-4" />
                            Invite
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* MEMBER LIST */}
            <div className="space-y-4">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="flex items-center justify-between space-x-4 rounded-lg border p-4 bg-card"
                    >
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-medium leading-none">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant={member.role === "owner" ? "default" : "secondary"} className="capitalize">
                                {member.role}
                            </Badge>

                            {member.role !== "owner" && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                            onClick={() => removeMember(member.id)}
                                        >
                                            Remove Member
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
