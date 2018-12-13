---
title: Insights
subTitle: 打心底喜欢的那些语句
cover: WX20181213-144309.png
category: "tools"
---

### ts定义 


#### GOOD
```typescript
// 参数相关的定义都很到位 不错... 

/**
 * 获取订单列表数据
 * @param {OrderListRequest} param
 * @returns {Promise<IGetStoreList>}
 */
async function getOrderList(param: OrderListRequest): Promise<AsyncResult<OrderListResponse>> {
  if (param.tid) {
    param.q = param.tid;
    delete param.tid;
  }

  let data = await Fetch.Common<OrderListResponse>(`${Config.D2C_TRADE_HOST[Config.ENVID]}/order/list`, {
    method: 'POST',
    body: JSON.stringify(param),
  });
  return data;
}

```


```
//React.Component<any, any>  ts目前的版本.默认值就是any , 可以写为React.Component
//另外如果any 太多, 到处都是, 用ts意义就不大了. 
//并不是文件名改为ts 我们就走了ts的套路; 

@Relax
export default class OrderPrivilege extends React.Component<any, any> {
  props: {
    relaxProps?: {
      switchData: any;
      goodsActivity: any;
      cartData: any;
      setSwitchData: (p) => void;
      privilegeClick: (p) => void;
      preOrderInfo: any;
    };
  };
```



```typescript

// 不要使用bind方法. bind方法每次都会返回一个新的方法, 所以,会不停刷新;

/**
 * 折扣卡片列表信息
 */
@Relax
export default class PrivilegeListCard extends React.Component {
   
  render() {
    const { tradeOriginalPrice = 0 } = this.props.relaxProps;
    const changedPrice = this._getChangePrice();
    return (
      <CashDashboardCard
        title="原价"
        titleRightText={(tradeOriginalPrice - changedPrice).toFixed(2)}
        style={this.props.style}
        contentStyle={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>{this._renderPrivilegeItems()}</ScrollView>
      </CashDashboardCard>
    );
  }


  _renderPrivilegeItems = () => { 
  
     ...
     
    return privilegesList.toJS().map((item: any, index: number) => {
      if (!item) {
        return null;
      }
      const key = item.key;
      if (!tagMap[key]) {
        return null;
      }
      return (
        <PrivilegeItem
          key={index}
          item={item}
          integral={integral}
          isUseIntegral={this.state.isUseIntegral}
          checked={this.state.checkedIndex === index}
          onUseCouponClick={this._onUseCouponClickAction.bind(this, index)}
          onUseIntegralChange={this._onUseIntegralClickAction}
        />
      );
    });
  };

  // 使用优惠券点击
  _onUseCouponClickAction = index => {
    if (this.couponChoosePopup) {
      return;
    }
    this.setState({ checkedIndex: index });
    const currentCoupon = this._getCurrentCoupon();
    this.couponChoosePopup = new RootSiblings(
      (
        <CouponChoosePopup
          onScanCoupon={this._onUseCouponChange}
          onClose={this._closeCouponPopup}
          coupon={currentCoupon}
        />
      ),
    );
  };
}




```

```typescript
//this.setState 方法是异步的. 如果要向外同步,应该在setState回调中进行; 

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputValue !== this.props.inputValue) {
      let exchange = nextProps.inputValue - nextProps.amount;
      if (exchange < 0 || isNaN(exchange)) {
        exchange = 0;
      }
      const exchangeAmount = parseFloat(exchange.toString()).toFixed(2);
      this.setState({ exchangeAmount });

      this.props.onExchangeChanged && this.props.onExchangeChanged(parseFloat(exchangeAmount));
    }
  }





```
```typescript

//单参数设计, 方便后面扩展; 

  // 使用积分下单
  marketPreOrder = (isUse?: boolean, couponNumber?: string, discounts?: IDiscounts) => {
    const request = this.state().get('preOrderRequest');
    if (request) {
      const preOrderRequest: IPreOrderRequest = request.toJS();
      let memberInfo = this.state().get('memberInfo');
      if (memberInfo) {
        memberInfo = memberInfo.toJS();
      }

      if (isUse !== undefined) {
        preOrderRequest.isUsingIntegral = isUse;
      }

      if (couponNumber !== undefined) {
        preOrderRequest.isUsingCoupon = couponNumber !== '' && !!couponNumber;
        preOrderRequest.couponVerifyCode = couponNumber;
      }

      if (discounts !== undefined) {
        preOrderRequest.clientPrivilegeInfo = discounts;
      }
      this._confirmPreOrder(preOrderRequest, memberInfo);
    }
  };



```


```typescript




```
