# frozen_string_literal: true

class OrdersController < ApplicationController
  before_action :set_order, only: %i[show edit update destroy]
  skip_before_action :verify_authenticity_token

  # GET /orders or /orders.json
  def index
    @page = (params[:page] || 1).to_i
    @total = ClientOrder.count
    @client_orders = ClientOrder.includes(
      {
        client: [:address],
        order_items: [:item]
      }
    ).order(created_at: :desc).page(@page)

    # @supplier_orders = SupplierOrder.all
  end

  # GET /orders/1 or /orders/1.json
  def show; end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # GET /orders/1/edit
  def edit; end

  # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
  def create
    params[:order][:order_items_attributes].each do |item|
      item[:id] = nil
    end

    params[:order][:user_id] = 1
    params[:order][:state] = Order::ORDER_STATES[:pending]
    params[:order][:total] = 0

    if params[:order][:client_id].present?
      @order = ClientOrder.new(order_params)
    elsif params[:order][:supplier_id].present?
      @order = SupplierOrder.new(order_params)
    end

    if @order.save
      render :show, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # rubocop:enable Metrics/AbcSize, Metrics/MethodLength

  # PATCH/PUT /orders/1 or /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to order_url(@order), notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1 or /orders/1.json
  def destroy
    @order.destroy!

    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { render json: Order.all, status: :ok }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_order
    @order = Order.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def order_params
    params.require(:order).permit(
      :user_id, :supplier_id, :client_id, :type, :state, :total, :country, :city, :region,
      :street, :post_code, :building, :flat, :note, :phone, order_items_attributes: %i[
        id item_id count price
      ]
    )
  end
end
