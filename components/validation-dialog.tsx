"use client"

import { useState } from "react"
import { CheckCircle2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ValidationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  type: "okr" | "action-plan"
  onValidate: (approved: boolean, feedback: string) => void
}

export function ValidationDialog({ open, onOpenChange, title, type, onValidate }: ValidationDialogProps) {
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = () => {
    if (decision) {
      onValidate(decision === "approve", feedback)
      setDecision(null)
      setFeedback("")
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Validar {type === "okr" ? "OKR" : "Plano de Ação"}</DialogTitle>
          <DialogDescription>
            {type === "okr"
              ? "Avalie o OKR e forneça feedback para a escola"
              : "Avalie o Plano de Ação e forneça feedback para a escola"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-medium mb-2">{title}</h3>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="decision">Decisão</Label>
            <RadioGroup
              value={decision || ""}
              onValueChange={(value) => setDecision(value as "approve" | "reject")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve" className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                  Aprovar
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="reject" id="reject" />
                <Label htmlFor="reject" className="flex items-center">
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  Reprovar
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Forneça um feedback construtivo para a escola"
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!decision}
            className={
              decision === "approve"
                ? "bg-green-600 hover:bg-green-700"
                : decision === "reject"
                  ? "bg-red-600 hover:bg-red-700"
                  : ""
            }
          >
            {decision === "approve" ? "Aprovar" : decision === "reject" ? "Reprovar" : "Enviar Avaliação"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
