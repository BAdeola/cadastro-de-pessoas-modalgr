import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './register-layout.component.html',
  styleUrls: ['./register-layout.component.scss'],
  providers: [DatePipe]
})
export class RegisterLayoutComponent {
  cadastroForm: FormGroup;
  registros: any = {}; //array para armazenar os dados cadastrados
  cadastroRealizado: boolean = false; //variável para controlar a exibição do formulário ou tabela

  constructor(private fb: FormBuilder, private http: HttpClient, private datePipe: DatePipe) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(150)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      cep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }

  get cpf() {
    return this.cadastroForm.get('cpf');
  }

  get dataNascimento() {
    return this.cadastroForm.get('dataNascimento');
  }

  get email() {
    return this.cadastroForm.get('email');
  }

  get cep() {
    return this.cadastroForm.get('cep');
  }

  formatarData(data: string): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
  }

  formatarCPF() {
    let cpfLimpo = this.cadastroForm.get('cpf')?.value.replace(/\D/g, '');
    if (cpfLimpo.length > 9) {
      cpfLimpo = cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.cadastroForm.get('cpf')?.setValue(cpfLimpo);
  }

  formatarCEP() {
    let cepLimpo = this.cadastroForm.get('cep')?.value.replace(/\D/g, '');
    if (cepLimpo.length > 5) {
      cepLimpo = cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    this.cadastroForm.get('cep')?.setValue(cepLimpo);
  }

  buscarEndereco() {
    const cep = this.cep?.value;
    if (cep && cep.length === 9) {
      this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
        data => {
          if (!data.erro) {
            this.cadastroForm.patchValue({
              logradouro: data.logradouro,
              bairro: data.bairro,
              cidade: data.localidade,
              estado: data.uf
            });
          } else {
            alert("CEP não encontrado!");
          }
        },
        error => {
          alert("Erro ao buscar CEP.");
        }
      );
    }
  }

  calcularIdade(): number {
    const dataNascimento = this.cadastroForm.get('dataNascimento')?.value;
    if (!dataNascimento) return 0;

    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();

    if (hoje.getMonth() < nascimento.getMonth() || 
        (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }

    return idade;
  }

  cadastrar() {
    if (this.cadastroForm.invalid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    this.registros = {
      nome: this.nome?.value,
      cpf: this.cpf?.value,
      dataNascimento: this.dataNascimento?.value,
      idade: this.calcularIdade(),
      email: this.email?.value,
      cep: this.cep?.value,
      logradouro: this.cadastroForm.get('logradouro')?.value,
      bairro: this.cadastroForm.get('bairro')?.value,
      cidade: this.cadastroForm.get('cidade')?.value,
      estado: this.cadastroForm.get('estado')?.value
    };

    console.log("Usuário cadastrado:", this.registros);
    this.cadastroRealizado = true; //exibir os dados após o cadastro
  }
}