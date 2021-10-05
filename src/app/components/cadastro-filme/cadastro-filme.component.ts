import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.scss']
})
export class CadastroFilmeComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  dataSource: Array<any> = new Array();
  teste2: any;
  form: FormGroup = this.formBuilder.group({
    formProduto: new FormControl(''),
    formFilme: new FormControl(''),
    formGenero: new FormControl(''),
    formFornecedor: new FormControl(''),
    formProdutoSearch: new FormControl(''),
    formFilmeSearch: new FormControl(''),
    formGeneroSearch: new FormControl(''),
    formFornecedorSearch: new FormControl(''),
    formDate: new FormControl(''),
    formPrice: new FormControl(''),
    formValor: new FormControl(''),
    formTitulo: new FormControl(''),
    formAtores: new FormControl(''),
    formDiretores: new FormControl(''),
  }) ;
  
  filtros = [
    {titulo: 'Tipo do Produto', controller: 'formProduto', options: [] as any},
    {titulo: 'Tipo de Filme', controller: 'formFilme', options: [] as any},
    {titulo: 'Genero', controller: 'formGenero', options: new Set},
    {titulo: 'Fornecedor', controller: 'formFornecedor', options: [] as any}
  ];

  mostrarImput = false;
  searching = false
  optionsSafe: any;
  selected = 'option2';
  imagemCarregada = '';
  tituloFilme = ''
  displayedColumns: string[] = ['Numero do Filme', 'Titulo do Filme', 'valor', 'Data Cadastro','Acoes'];
  acoes = [
    {titulo: 'delete', func: (i: number) => this.deletar(i)}]
  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
   this.form = this.formBuilder.group({
      formProduto: new FormControl(''),
      formFilme: new FormControl(''),
      formGenero: new FormControl(''),
      formFornecedor: new FormControl(''),
      formProdutoSearch: new FormControl(''),
      formFilmeSearch: new FormControl(''),
      formGeneroSearch: new FormControl(''),
      formFornecedorSearch: new FormControl(''),
      formDate: new FormControl(''),
      formPrice: new FormControl(''),
      formValor: new FormControl(''),
      formTitulo: new FormControl(''),
      formAtores: new FormControl(''),
      formDiretores: new FormControl(''),
      formPoster: new FormControl('')
    })
  }

  carregarForm(){
    this.dataSource.forEach((filme: any) => {
      this.filtros.forEach(filtro => {
        if (filtro.titulo === 'Genero') {
          filtro.options.add(filme.genero)
        }
      })
    });
  }

  showImput(){
    console.log(this.form.value.formPoster);
    
    if (this.form.value.formPoster) {
      this.imagemCarregada = this.form.value.formPoster
    } else {
      this.imagemCarregada = '';
    }
    this.mostrarImput = !this.mostrarImput 
  }

  salvarFormulario(){
    this.dataSource.push({
      data: this.form.controls.value,
      valor: this.form.value.formValor,
      nome: this.form.value.formTitulo,
      produto: this.form.value.formProduto,
      genero: this.form.value.formGenero,
      position: this.dataSource.length,
      ano: this.form.value.formDate,
      ator: this.form.value.formAtores,
      diretor: this.form.value.formDiretores,
      poster: this.form.value.formPoster
    })
    this.dataSource = new Array(...this.dataSource)
    
  }

  salvarTabela(){
    const dataSourceString = JSON.stringify(this.dataSource);
    var a = document.createElement("a");
    var file = new Blob([dataSourceString], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'filmes.json';
    a.click();
  }


  async abrirBase(event: any){
    const o  = await new Promise<any>((res, err): any => {
      const file: Blob = event?.target.files[0]
      var reader = new FileReader(),
          result;
  
      reader.onload = function(e)
      {
          result = e?.target?.result;
          res(result)
          
      };
      reader.readAsText(file);
    });
    this.dataSource = JSON.parse(o);
    this.carregarForm();
  }

  buscarFiltro(event: Event, options: Array<string>, filtroSelecionado: string){
    options = Array.from(options)
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      if (!this.optionsSafe) {
        this.optionsSafe = options;
      }
      options = options.filter(item => item.includes(value));
    } else{
      options = this.optionsSafe;
    }
    this.filtros = this.filtros.filter(filtro => filtro.options = filtro.titulo === filtroSelecionado? options: filtro.options)
  }

  selecionarFiltro(event: any,controlName: string,  filtroSelecionado: string){
    const value = (event.target as HTMLInputElement).value;
    this.form.patchValue({[controlName]: value})
    this.filtros = this.filtros.filter(filtro => filtro.titulo === filtroSelecionado? filtro.options.push(...this.optionsSafe, value): filtro)
  }


  carregarDados(element: any){
    this.tituloFilme = element.nome;
    this.imagemCarregada = element.poster;
    this.form.controls.formValor.setValue(element.position || '');
    this.form.controls.formTitulo.setValue(element.nome || '');
    this.form.controls.formAtores.setValue(element.ator || '');
    this.form.controls.formDiretores.setValue(element.diretor || '');
    this.form.controls.formPrice.setValue(element.valor || '');
    this.form.controls.formDate.setValue(element.data || '');
  }
  deletar(index = -1){
    this.dataSource.splice(index,1);
    this.dataSource = new Array(...this.dataSource)
    console.log(this.dataSource,index);
    
  }

  executarAcao(acao: any, index: number){
    acao.func(index);
  }
}
