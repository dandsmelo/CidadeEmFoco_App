import { useState } from "react";
import { DenunciaData } from "@/interfaces/DenunciaData";
import { useAuth } from "../auth/useAuth";
import { router } from "expo-router";
import { useFlashMessage } from "@/components/FlashMessageContext";

export function useDenuncia() {
  const { token, userId, userType } = useAuth();
  const { showMessage } = useFlashMessage();

  const [denuncias, setDenuncias] = useState<DenunciaData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDenuncias = async () => {
    if (!token || !userId || !userType) {
      showMessage("Usuário não autenticado", "error");
      return;
    }

    try {
      const url = userType === "servidorPublico"
          ? "http://localhost:3000/denuncia"
          : `http://localhost:3000/denuncia/usuario/${userId}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setDenuncias(data);
      } else {
        showMessage(data?.message || "Erro ao buscar denúncias", "error");
      }
    } catch {
      showMessage("Erro de conexão ao carregar denúncias", "error");
    }
  };

  const criarDenuncia = async (nova: Omit<DenunciaData, "_id" | "status">) => {
    if (!token) {
      showMessage("Usuário não autenticado", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/denuncia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...nova,
          status: "Pendente",
          data: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage("Denúncia criada com sucesso!", "success");
        router.push("/minhasDenuncias");
      } else {
        showMessage(data.message || "Erro ao criar denúncia", "error");
      }
    } catch {
      showMessage("Erro de conexão ao criar denúncia", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarStatus = async (id: string, status: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        showMessage("Denúncia atualizada com sucesso!", "success");
        router.push("/minhasDenuncias");
      } else {
        const err = await response.json();
        showMessage(err.message || "Erro ao atualizar denúncia", "error");
      }
    } catch {
      showMessage("Erro de conexão ao atualizar denúncia", "error");
    }
  };

  const editarDenuncia = async (id: string, dados: DenunciaData) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        showMessage("Denúncia editada com sucesso!", "success");
        router.push("/minhasDenuncias");
      } else {
        const err = await response.json();
        showMessage(err.message || "Erro ao editar denúncia", "error");
      }
    } catch {
      showMessage("Erro de conexão ao editar denúncia", "error");
    }
  };

  const excluirDenuncia = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/denuncia/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        showMessage("Denúncia excluída com sucesso!", "success");
        router.push("/minhasDenuncias");
      } else {
        const err = await response.json();
        showMessage(err.message || "Erro ao excluir denúncia", "error");
      }
    } catch {
      showMessage("Erro de conexão ao excluir denúncia", "error");
    }
  };

  return {
    denuncias,
    isLoading,
    fetchDenuncias,
    criarDenuncia,
    atualizarStatus,
    editarDenuncia,
    excluirDenuncia,
  };
}
