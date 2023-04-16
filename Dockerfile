FROM beevelop/cordova

WORKDIR /src-cordova

COPY . .

CMD ["cordova", "build", "android"]
