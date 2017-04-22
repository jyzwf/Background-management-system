<template lang="jade">
	.modal.in(role="dialog")
		.modal-backdrop.fade.in(@click='hide(0)')
		.modal-dialog
			.modal-content
				.modal-header
					button.close(type="button" data-dismiss="modal")
						span(aria-hidden="true")
						span.sr-only Close
					h2 {{modalTitle}}
				.modal-body
					slot(name='modal-body')
				.modal-footer
					button.btn.btn-default(data-dismiss="modal",type="button",@click='hide(0)') {{cancelText}}
					slot(name='modal-btn')
</template>

<style lang='scss' scoped>
.modal{
  transition: all 0.3s ease;
  &.in{
  		display: block;
  		opacity: 1
  }

  .modal-backdrop{
  	&.in{
  		opacity: .5
  	}
  }

  .modal-dialog{
  	z-index: 1050;
  	position: absolute;
    left: 50%;
    top: 50%;
    margin:0;
    transform: translate3d(-50%,-50%,0);
    overflow-y: auto;
    max-height:90%;
  }


}
</style>

<script type="text/javascript">
	export default{
		props:{
			cancelText:{
				type:String,
				default:'取消'
			},
			modalTitle: {
    		  type: String,
    		  default: ''
    		},
    		hide:{
    			type:Function,
    			default:null
    		}
		}
		
	}
</script>