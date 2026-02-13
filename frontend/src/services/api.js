

//Puerto/base URL del backend
export const API_BASE = "http://localhost:3001";




function buildHeaders(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}


async function handleJsonResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Error de red (${response.status}) al llamar a la API`;
    throw new Error(message);
  }

  return data;
}



export async function loginUser(arg1, arg2) {
  let usernameOrEmail;
  let password;

  if (typeof arg1 === "object") {
    usernameOrEmail = arg1.usernameOrEmail;
    password = arg1.password;
  } else {
    usernameOrEmail = arg1;
    password = arg2;
  }

  if (!usernameOrEmail || !password) {
    throw new Error("Debes indicar usuario/email y contraseña.");
  }

  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ usernameOrEmail, password }),
  });

  const data = await handleJsonResponse(response);
  const user = data.user || {};

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token: data.token,
  };
}



export async function registerUser({ username, email, password }) {
  if (!username || !email || !password) {
    throw new Error("username, email y password son obligatorios.");
  }

  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ username, email, password }),
  });

  const data = await handleJsonResponse(response);
  const user = data.user || {};

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    token: data.token,
  };
}



export async function getUserProfile(token) {
  if (!token) {
    throw new Error("Falta el token de autenticación.");
  }

  const response = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    headers: buildHeaders(token),
  });

  const data = await handleJsonResponse(response);
  return data.user || data;
}



export async function fetchAvailableDrones() {
  console.log("[FAKE fetchAvailableDrones] (frontend)");

  return [
    { id: 1, name: "Dron A - BeeWorker" },
    { id: 2, name: "Dron B - HoneyPilot" },
    { id: 3, name: "Dron C - FlowerScout" },
  ];
}



export async function createUserWithMission(formData) {
  console.log("[FAKE createUserWithMission]", formData);

  return {
    success: true,
    missionId: 123,
  };
}



export async function createMissionRequest(form, token) {
  //Normalizar GeoJSON antes de enviarlo
  let normalizedGeoJSON = null;

  if (form.parcelGeoJSON) {
    try {
      // Si viene como string JSON, parseamos
      if (typeof form.parcelGeoJSON === "string") {
        normalizedGeoJSON = JSON.parse(form.parcelGeoJSON);
      } else if (
        form.parcelGeoJSON.type === "FeatureCollection" ||
        form.parcelGeoJSON.type === "Feature"
      ) {
        normalizedGeoJSON = form.parcelGeoJSON;
      } else if (
        form.parcelGeoJSON.type === "Polygon" ||
        form.parcelGeoJSON.type === "MultiPolygon"
      ) {
        normalizedGeoJSON = {
          type: "Feature",
          properties: {},
          geometry: form.parcelGeoJSON,
        };
      } else if (form.parcelGeoJSON.geometry) {
        normalizedGeoJSON = {
          type: "Feature",
          properties: form.parcelGeoJSON.properties || {},
          geometry: form.parcelGeoJSON.geometry,
        };
      } else {
       
        normalizedGeoJSON = form.parcelGeoJSON;
      }
    } catch (e) {
      console.error(
        "Error normalizando parcelGeoJSON en createMissionRequest:",
        e
      );
      normalizedGeoJSON = null;
    }
  }

  console.log(
    "[createMissionRequest] GeoJSON que se envía en parcel.geojson:",
    normalizedGeoJSON
  );

  const payload = {
    user: {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      username: form.username,
      password: form.password,
      phone: form.phone,
    },
    parcel: {
      name: form.parcelName,
      address: form.parcelAddress,
      
      geojson: normalizedGeoJSON,
    },
    mission: {
      droneId: form.droneId ? Number(form.droneId) : null,
      startDate: form.startDate || null,
      price: 60,
      notifications: form.notifications,
    },
  };

  console.log("[REAL createMissionRequest] payload:", payload);

  const response = await fetch(`${API_BASE}/api/missions/full-create`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(payload),
  });

  const data = await handleJsonResponse(response);
  return data;
}



export async function getUserMissions(arg1, arg2) {
  let token = null;
  let userId = null;

  if (typeof arg1 === "object" && arg1 !== null) {
    token = arg1.token;
    userId = arg1.userId ?? arg2;
  } else {
    token = arg1;
    userId = arg2;
  }

  if (!token) {
    throw new Error("Falta el token de autenticación.");
  }

  if (!userId) {
    try {
      const stored = localStorage.getItem("beebloomAuth");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.user?.id) {
          userId = parsed.user.id;
        }
      }
    } catch (_) {}
  }

  if (!userId) {
    throw new Error(
      "No se ha podido determinar el usuario autenticado para cargar las misiones."
    );
  }

  const response = await fetch(`${API_BASE}/api/missions/by-user/${userId}`, {
    method: "GET",
    headers: buildHeaders(token),
  });

  const apiMissions = await handleJsonResponse(response);

  return (apiMissions || []).map((m) => {
    const parcelName = m.Parcel?.name || "Parcela sin nombre";
    const scheduledDate = m.startAt
      ? String(m.startAt).slice(0, 10)
      : "Pendiente de asignar";

    const price = m.price ?? 60;

    
    const canDownloadReceipt = true;

    return {
      id: m.id,
      title: m.title,
      status: m.status,
      statusLabel: undefined,
      parcelName,
      scheduledDate,
      price,
      canDownloadReceipt,
    };
  });
}



export function downloadMissionReceipt(missionId) {
  if (!missionId) {
    throw new Error("Falta el id de la misión para descargar el recibo.");
  }

  const url = `${API_BASE}/api/missions/${missionId}/xml`;
  window.open(url, "_blank");
}



export async function fetchAllMissions(token) {
  const response = await fetch(`${API_BASE}/api/missions`, {
    method: "GET",
    headers: buildHeaders(token),
  });

  const data = await handleJsonResponse(response);
  return data;
}



export async function payMission(missionId, payload = {}, token) {
  if (!missionId) throw new Error("Falta missionId para payMission.");

  const body = {
    payment_method: payload.payment_method || "transferencia",
    payment_date: payload.payment_date || new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE}/api/missions/${missionId}/pay`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(body),
  });

  const data = await handleJsonResponse(response);
  return data;
}



export async function completeMission(missionId, token) {
  if (!missionId) throw new Error("Falta missionId para completeMission.");

  const response = await fetch(
    `${API_BASE}/api/missions/${missionId}/status`,
    {
      method: "PUT",
      headers: buildHeaders(token),
      body: JSON.stringify({ status: "completada" }),
    }
  );

  const data = await handleJsonResponse(response);
  return data;
}