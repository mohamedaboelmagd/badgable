export interface Threebox {
  /**
   * Access the profile store of the users threeBox.
   */
  public: KeyValueStore;
  /**
   * Access the private store of the users threeBox
   */
  private: KeyValueStore;
  /**
   * Closes the 3box instance without clearing the local cache.
   * Should be called after you are done using the 3Box instance, but without logging the user out.
   */
  close(): void;
  /**
   * Closes the 3box instance and clears local cache.
   * If you call this, users will need to sign a consent message to log in the next time you call openBox.
   */
  logout(): void;

  openSpace(
    address: string
  ): {
    public: {
      set: Function;
      get: Function;
      all: Function;
      setMultiple: Function;
    };
  };

  getProfile(address: string): { badges: any; public: { set: Function } };

  listSpaces(address: string): {};

  getSpace(address: string, name: string): {};

  onSyncDone(fn: Function): void;
}

export interface KeyValueStore {
  /**
   * Returns array of underlying log entries.
   * In linearized order according to their Lamport clocks
   * Useful for generating a complete history of all operations on store.
   */
  log(): Array<Object>;
  /**
   * Get the value of the given key.
   * @param key The key to get in the profile.
   * @returns The value associated with the key.
   */
  get(key: string): string | string[];
  /**
   * Set a value for the given key.
   * @param key The key to modify in the profile.
   * @param value The value to add in the profile.
   * @returns True if successful.
   */
  set(key: string, value: string | string[]): boolean;
  /**
   * Remove the value for the given key
   * @param key The key to remove from the profile.
   * @return True if successful.
   */
  remove(key: string): boolean;
}

export interface BoxOptions {
  /** A ipfs options object to pass to the js-ipfs constructor. */
  ipfsOptions: Object;
  /** A custom path for orbitdb storage. */
  orbitPath: string;
  /** A function that will be called when the user has consented to opening the box. */
  consentCallback: Function;
}

export interface GetProfileOptions {
  /** A ipfs options object to pass to the js-ipfs constructor. */
  ipfsOptions: Object;
  /** A custom path for orbitdb storage. */
  orbitPath: string;
  /** The address of the server to call. */
  addressServer: string;
}
