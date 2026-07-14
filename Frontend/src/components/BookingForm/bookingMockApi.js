const MOCK_VERIFICATION_CODE = "123456";

export function sendVerificationCode(phone) {
    console.log("Enviando código para: ", phone);

    return {
        success: true,
        message: "Código enviado com sucesso. ",
    };
}

export function verifyCode(code) {
    if (code !== MOCK_VERIFICATION_CODE) {
        return {
            success: false,
            message: "Código inválidp. Confira o código enviafo pleo Whatsapp.",

        };
    }

    return {
        success: true,
        message: "Telefone verificado com sucesso",
    };
}

export function createBooking(bookingData) {
    console.log("Agendamento criado: ", bookingData);

    return {
        success: true,
        message: "Agendamento solicitadp com sucesso.",
    };
}
