import MainLayout from "../layouts/MainLayout";
import { useState, useRef, useEffect  } from "react";
import styled from "styled-components";
import { CustomModal, CustomInput, CustomInputTextArea, CustomInputLocation, CustomButton, CustomHourFormInput, CustomInputFormPayment, PhoneInput, CustomInputService } from "../components";
import { registerService } from "../services/services";

export default function MinhaPagina() {
  const storedUser = JSON.parse(localStorage.getItem("dataUser") || "{}");
  const userId = storedUser.user.id;
  const [formData, setFormData] = useState({ name: "", description: "", images: [], location: "", hours: {}, services: {}, payments: {}, phone: "" });
  const [hours, setHours] = useState({
    segunda: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    terca: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    quarta: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    quinta: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    sexta: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    sabado: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
    domingo: { ativo: false, entrada: "", saida: "", intervalo: false, intervaloInicio: "", intervaloFim: "" },
  });
  const [payments, setPayments] = useState({
    pix: false,
    credito: false,
    debito: false,
    transferencia: false,
    dinheiro: false,
    outros: false,
    outrosDescricao: ""
  });
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [serviceData, setServiceData] = useState({ id_business: '', image: null, name: '', summary: '', price: '', duration: '' });
  const [services, setServices] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, type: "info", message: "" });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      hours: hours,
      payments: payments,
    }));
  }, [hours, payments]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: files,
    }));
    console.log(formData)
  }

  function handleImageClick() {
    fileInputRef.current.click();
  }

  function showPage() {
    alert('Vai mostrar a previa da pagina no futuro')
  }

  function addEmployer() {
    alert('Vai adicionar um funcionario')
  }

  function addService() {
    setServiceData(prev => ({
      ...prev,
    }));
    setShowServiceForm(true);
  }

  function cancelService() {
    setShowServiceForm(false);
    setServiceData({ image: null, name: '', summary: '', price: '', duration: '' });
  }

  async function confirmService() {
    setLoading(true);
    try {
      const formattedServiceData = {
        ...serviceData,
        id_business: userId, 
        price: parseFloat(
          serviceData.price
            .replace('R$', '')
            .replace(/\s/g, '')
            .replace('.', '')
            .replace(',', '.')
        ),
        duration: convertTimeToMinutes(serviceData.duration)
      };
  
      const response = await registerService(formattedServiceData);
  
      setModal({
        show: true,
        type: "success",
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
      setModal({
        show: true,
        type: "error",
        message: error.response?.data?.message || "Erro ao registrar serviço",
      });
    } finally {
      setLoading(false);
    }
  }
  
  function convertTimeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }
  
  function handleServiceChange(e) {
    const { name, value, files } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }

  const preview = formData.images && formData.images.length > 0 ? URL.createObjectURL(formData.images[0]) : "/upload.jpg";
  const previewService = serviceData.image ? URL.createObjectURL(serviceData.image) : "/upload.jpg";

  return (
    <MainLayout>
      <Styled.Container>
        <Styled.Line>
          <Styled.Column>
            <Styled.Title>Tela de Minha Pagina</Styled.Title>
            <Styled.Subtitle>Adicione uma ou várias fotos</Styled.Subtitle>
          </Styled.Column>
          <CustomButton onClick={showPage}>Exibir Página</CustomButton>
        </Styled.Line>

        <Styled.Form>
          <Styled.Line>
            <Styled.Column>

              <Styled.ImageWrapper onClick={handleImageClick}>
                <Styled.Image src={preview} alt="Clique para alterar" />
              </Styled.ImageWrapper>

              <Styled.FileInput
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </Styled.Column>

            <Styled.Column>
              <CustomInput
                label="Nome do Negócio"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <CustomInputTextArea
                label="Descreva seu Negócio"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
              />
            </Styled.Column>
          </Styled.Line>

          <Styled.Line>
            <CustomInputLocation
              label="Localização"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Styled.Line>

          <Styled.Line>
            <CustomHourFormInput label={"Disponibilidade de Horários"} hours={hours} setHours={setHours} />
          </Styled.Line>

          <Styled.Line>
            <Styled.Title>Serviços</Styled.Title>
            {!showServiceForm && (
              <CustomButton onClick={addService}>+ Adicionar Serviço</CustomButton>
            )}
          </Styled.Line>

          {showServiceForm && (
            <CustomInputService
              serviceData={serviceData}
              handleImageClick={() => {setServiceData(1)}}
              preview={previewService}
              onChange={(handleServiceChange)}
              onConfirm={confirmService}
              onCancel={cancelService}
            />
          )}

          {services.map((service, idx) => (
            <Styled.ServiceCard key={idx}>
              <img src={service.imageUrl} alt={service.name} width="100" />
              <div>
                <h4>{service.name}</h4>
                <p>{service.summary}</p>
                <p>Valor: {service.price}</p>
                <p>Duração: {service.duration}</p>
              </div>
            </Styled.ServiceCard>
          ))}


          <Styled.Line>
            <CustomInputFormPayment payments={payments} setPayments={setPayments} />
          </Styled.Line>

          <Styled.Line>
            <Styled.Title>Equipe</Styled.Title>
            <CustomButton onClick={addEmployer}>+ Adicionar Funcionário</CustomButton>
          </Styled.Line>

          <Styled.ContactSection>
            <Styled.Title>Contato</Styled.Title>
            <PhoneInput
              label="Telefone/Celular"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <CustomButton onClick={addEmployer}>+ Adicionar Rede Social</CustomButton>
          </Styled.ContactSection>

          <hr className="my-4 border-dark" />

          <CustomButton onClick={addEmployer}>Publicar Minha Página</CustomButton>
          
        </Styled.Form>
        <CustomModal
          show={modal.show}
          type={modal.type}
          message={modal.message}
          onHide={() => setModal({ ...modal, show: false })}
      />
      </Styled.Container>
    </MainLayout>
  );
}

const Styled = {
  Container: styled.div`
    padding: 2rem;
    font-family: sans-serif;
    @media (max-width: 768px) {
      padding: 1rem;
    }
  `,

  Title: styled.h2`
    text-align: left;
    margin-bottom: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primaryDark};
  `,

  ContactSection: styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;

    @media (max-width: 768px) {
      width: 100%;
    }
  `,

  Subtitle: styled.h6`
    text-align: left;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  `,

  Form: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,

  FileInput: styled.input`
    position: absolute !important;
    width: 0 !important;
    height: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    overflow: hidden !important;
    border: 0 !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(100%) !important;
    white-space: nowrap !important;
    display: none !important;
  `,

  ImageWrapper: styled.div`
    width: 400px;
    height: 300px;
    cursor: pointer;
    border: 2px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
      width: 100%;
      height: 200px;
    }
  `,

  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
  `,

  Line: styled.div`
    display: flex;
    gap: 1rem;
    align-items: stretch;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `,

  Column: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 1;

    & > *:last-child {
      flex: 1;
      display: flex;
      flex-direction: column;

      textarea {
        flex: 1;
        height: 100% !important;
      }
    }
  `,
};
