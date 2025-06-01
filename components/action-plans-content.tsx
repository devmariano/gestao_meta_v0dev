"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ValidationDialog } from "@/components/validation-dialog"

export default function ActionPlansContent() {
  const [userType, setUserType] = useState<string | null>(null)
  const [openNewPlan, setOpenNewPlan] = useState(false)
  const [validationOpen, setValidationOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<{ id: string; title: string } | null>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const handleValidate = (approved: boolean, feedback: string) => {
    // Aqui você implementaria a lógica para salvar a validação
    console.log(`Plano de Ação ${approved ? "aprovado" : "reprovado"}: ${feedback}`)
    // Atualizar a interface após a validação
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planos de Ação</h1>
          <p className="text-muted-foreground">Gerencie ações para atingir seus objetivos</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          {userType === "escola" && (
            <Dialog open={openNewPlan} onOpenChange={setOpenNewPlan}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Plano de Ação
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Plano de Ação</DialogTitle>
                  <DialogDescription>Defina uma ação específica para atingir um resultado-chave</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" placeholder="Ex: Implementar programa de reforço em Matemática" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descreva a ação em detalhes" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cause">Causa Relacionada</Label>
                    <Textarea id="cause" placeholder="Descreva a causa que esta ação pretende resolver" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="start-date">Data de Início</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="end-date">Data de Término</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="responsible">Responsável</Label>
                    <Select>
                      <SelectTrigger id="responsible">
                        <SelectValue placeholder="Selecione um responsável" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">Maria Silva</SelectItem>
                        <SelectItem value="joao">João Santos</SelectItem>
                        <SelectItem value="ana">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="okr">OKR Relacionado</Label>
                    <Select>
                      <SelectTrigger id="okr">
                        <SelectValue placeholder="Selecione um OKR" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="matematica">Melhorar desempenho em Matemática</SelectItem>
                        <SelectItem value="evasao">Reduzir evasão escolar</SelectItem>
                        <SelectItem value="pais">Aumentar participação dos pais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenNewPlan(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Plano de Ação</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar planos de ação..." className="pl-8" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem>Todos os planos</DropdownMenuItem>
            <DropdownMenuItem>Em andamento</DropdownMenuItem>
            <DropdownMenuItem>Concluídos</DropdownMenuItem>
            <DropdownMenuItem>Atrasados</DropdownMenuItem>
            <DropdownMenuItem>Pendentes</DropdownMenuItem>
            {userType === "gpa" && <DropdownMenuItem>Boas práticas</DropdownMenuItem>}
            <DropdownMenuSeparator />
            <DropdownMenuItem>Período atual</DropdownMenuItem>
            <DropdownMenuItem>Período anterior</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Plano de Ação</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>OKR Relacionado</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {userType === "gpa" && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">
                            <Star className="mr-1 h-3 w-3" />
                            Boa Prática
                          </Badge>
                        )}
                        <span>Programa de monitoria em Matemática</span>
                      </div>
                    </TableCell>
                    <TableCell>Maria Silva</TableCell>
                    <TableCell>Melhorar desempenho em Matemática</TableCell>
                    <TableCell>30/06/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-amber-500" />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {userType === "gpa" && (
                            <>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentPlan({
                                    id: "programa-monitoria",
                                    title: "Programa de monitoria em Matemática",
                                  })
                                  setValidationOpen(true)
                                }}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Validar plano
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Programa de acompanhamento de frequência</TableCell>
                    <TableCell>João Santos</TableCell>
                    <TableCell>Reduzir evasão escolar</TableCell>
                    <TableCell>15/07/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-amber-500" />
                        <span className="text-xs">Em andamento</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {userType === "gpa" && (
                            <>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentPlan({
                                    id: "programa-acompanhamento",
                                    title: "Programa de acompanhamento de frequência",
                                  })
                                  setValidationOpen(true)
                                }}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Validar plano
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Reuniões bimestrais com pais</TableCell>
                    <TableCell>Ana Oliveira</TableCell>
                    <TableCell>Aumentar participação dos pais</TableCell>
                    <TableCell>15/05/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-green-500" />
                        <span className="text-xs">Concluído</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {userType === "gpa" && (
                            <>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentPlan({
                                    id: "reunioes-bimestrais",
                                    title: "Reuniões bimestrais com pais",
                                  })
                                  setValidationOpen(true)
                                }}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Validar plano
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">Reforço em Matemática para 7º ano</TableCell>
                    <TableCell>Carlos Mendes</TableCell>
                    <TableCell>Melhorar desempenho em Matemática</TableCell>
                    <TableCell>10/06/2024</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-xs">Atrasado</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Abrir menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          {userType === "gpa" && (
                            <>
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                Marcar como boa prática
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentPlan({
                                    id: "reforco-matematica",
                                    title: "Reforço em Matemática para 7º ano",
                                  })
                                  setValidationOpen(true)
                                }}
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Validar plano
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline de Planos de Ação</CardTitle>
              <CardDescription>Visualização temporal dos planos de ação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-green-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Reuniões bimestrais com pais</h3>
                    <span className="text-sm text-muted-foreground">15/05/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Organizar reuniões bimestrais com os pais para apresentar o desempenho dos alunos e discutir
                    estratégias de melhoria.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Concluído
                    </Badge>
                    <Badge variant="outline">Ana Oliveira</Badge>
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-red-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Reforço em Matemática para 7º ano</h3>
                    <span className="text-sm text-muted-foreground">10/06/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar aulas de reforço em Matemática para alunos do 7º ano com dificuldades de aprendizagem.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Atrasado
                    </Badge>
                    <Badge variant="outline">Carlos Mendes</Badge>
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8 pb-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-amber-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Programa de monitoria em Matemática</h3>
                    <span className="text-sm text-muted-foreground">30/06/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar um programa de monitoria onde alunos com melhor desempenho auxiliam colegas com
                    dificuldades.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Em andamento
                    </Badge>
                    <Badge variant="outline">Maria Silva</Badge>
                    {userType === "gpa" && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        <Star className="mr-1 h-3 w-3" />
                        Boa Prática
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="relative border-l border-slate-200 pl-8">
                  <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-amber-500" />
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Programa de acompanhamento de frequência</h3>
                    <span className="text-sm text-muted-foreground">15/07/2024</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Implementar um sistema de acompanhamento diário de frequência com contato imediato aos pais em caso
                    de ausência.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      <Clock className="mr-1 h-3 w-3" />
                      Em andamento
                    </Badge>
                    <Badge variant="outline">João Santos</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {userType === "gpa" && currentPlan && (
        <ValidationDialog
          open={validationOpen}
          onOpenChange={setValidationOpen}
          title={currentPlan.title}
          type="action-plan"
          onValidate={handleValidate}
        />
      )}
    </div>
  )
}
